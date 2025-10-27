#!/bin/bash

# Purpose: Remove ejs so can use The Nu Html Checker (vnu) to validate our
# HTML.

# 1. Run script
# 2. cd into the output directory
# 3. vnu *.html file

# CRIT: Use Vscode Default HTML Formatter before using modified prettier
# plugin formatter because it automatically removes the void element / end 
# marks.


# Define the source directory (where your .ejs files are)
SOURCE_DIR="." 

# Define the temporary output directory (where the clean HTML will go)
OUTPUT_DIR="./temp_html_for_vnu"

mkdir -p "$OUTPUT_DIR"

echo "Stripping EJS tags from files in $SOURCE_DIR..."

find "$SOURCE_DIR" -name "*.ejs" | while read EJS_FILE; do
    
    HTML_FILE=$(basename "$EJS_FILE" .ejs).html
    OUTPUT_PATH="$OUTPUT_DIR/$HTML_FILE"

    # 1. AWK: Strip EJS Tags (Multi-line aware)
    # 2. TR: Remove Newlines/Carriage Returns/Tabs (aggressive consolidation)
    # 3. SED: Collapse multiple spaces into a single space
   awk '
    function process_line(line) {
        while (line ~ /<[%-][=]?/) {
            start = match(line, /<[%-][=]?/)
            end   = match(line, /%>/)
            
            if (end > start) {
                line = substr(line, 1, start-1) substr(line, end+2)
            } else {
                line = substr(line, 1, start-1)
                in_ejs = 1
                break
            }
        }
        return line
    }

    {
        if (in_ejs == 1) {
            if ($0 ~ /%>/) {
                end = match($0, /%>/)
                $0 = substr($0, end+2)
                in_ejs = 0
                $0 = process_line($0)
                if ($0 != "") print
            }
        } else {
            $0 = process_line($0)
            if ($0 != "") print
        }
    }' "$EJS_FILE" | tr -d '\n\r\t' | sed 's/ \{2,\}/ /g' > "$OUTPUT_PATH"
    
    echo "  -> Stripped $EJS_FILE to $OUTPUT_PATH"
done

echo ""
echo "EJS stripping complete. Running VNU on files in $OUTPUT_DIR..."
