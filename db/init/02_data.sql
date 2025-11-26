INSERT INTO books (
    title, 
    authors, 
    publication_year, 
    isbn, 
    description, 
    page_count, 
    image_url
) VALUES (
    'Gidget',
    'Frederick Kohner',
    2001,
    '9780425179628',
    'The classic novel of 1950''s American youth is back in print with rare photos.',
    154,
    'https://coverart.oclc.org/ImageWebSvc/oclc/+-+39383119_140.jpg?allowDefault=false&client=WorldcatOrgUI'
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'A1',
    LAST_INSERT_ID()
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'A2',
    LAST_INSERT_ID()
);


INSERT INTO books (
    title, 
    authors, 
    publication_year, 
    isbn, 
    description, 
    page_count, 
    image_url
) VALUES (
    'Modern graph theory',
    'Béla Bollobás',
    1998,
    '9780387984919',
    '"This book is an in-depth account of graph theory; it reflects the current state of the subject and emphasizes connections with other branches of pure mathematics..."',
    394,
    'https://coverart.oclc.org/ImageWebSvc/oclc/+-+99566938_140.jpg?allowDefault=false&client=WorldcatOrgUI'
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'B1',
    LAST_INSERT_ID()
);


INSERT INTO books (
    title, 
    authors, 
    publication_year, 
    isbn, 
    description, 
    page_count,
    image_url
) VALUES (
    'Monumentos nacionales de la República de Cuba',
    'Iris del Pilar Gorostola Pérez (Editor), 
Nilson Acosta Reyes (Compiler), Cuba Comisión Nacional de Monumentos (Issuing body), 
Consejo Nacional de Patrimonio Cultural (Cuba) (Issuing body)',
    2015,
    '9789597233152',
    'Elaborated by the Consejo Nacional de Patrimonio Cultural and the Comisión Nacional de Monumentos, the book brings together information about all of the historical, natural and archaeological sites, urban centers and buildings, objects and cultural landscapes that have received the status of Cuban National Monument. Each entry comprises a brief and clear explanation, the reasons that supported their designation, (date and the resolutions), maps, and a selection of color photographs',
    296,
    'https://m.media-amazon.com/images/I/81aKKMo7RML._SL1500_.jpg'
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'C1',
    LAST_INSERT_ID()
);


INSERT INTO books (
    title, 
    authors, 
    publication_year, 
    isbn, 
    description, 
    page_count, 
    image_url
) VALUES (
    'No ordinary genius : the illustrated Richard Feynman',
    'Richard P. Feynman, Christopher Sykes',
    1994,
    '9780393036213',
    'If Richard Feynman had not existed it would not be possible to create him. The most extraordinary scientist of his time...',
    272,
    'https://coverart.oclc.org/ImageWebSvc/oclc/+-+13627437_140.jpg?allowDefault=false&client=WorldcatOrgUI'
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'D1',
    LAST_INSERT_ID()
);


INSERT INTO books (
    title, 
    authors, 
    publication_year, 
    isbn, 
    description, 
    page_count, 
    image_url
) VALUES (
    'Secrets of the Borland C++ masters',
    'Ed Mitchell',
    1992,
    '9780672301377',
    'Offering tips, techniques and shortcuts for intermediate and advanced programmers, this work helps users produce faster programs whilst using less memory.',
    730,
    'https://m.media-amazon.com/images/I/61Mjfo6+UmL._SL1500_.jpg'
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'E1',
    LAST_INSERT_ID()
);


INSERT INTO books (
    title, 
    authors, 
    publication_year, 
    isbn, 
    description, 
    page_count,
    image_url
) VALUES (
    'The Practice of Programming',
    'Brian W. Kernighan, Rob Pike',
    1999,
    '9780201615869',
    '"Brian Kernighan and Rob Pike have written The Practice of Programming to help make individual programmers more effective and productive." "The practice of programming is more than just writing code. Programmers must also assess tradeoffs, choose among design alternatives, debug and test, improve performance, and maintain software written by themselves and others. At the same time, they must be concerned with issues like compatibility, robustness, and reliability, while meeting specifications." "The Practice of Programming covers all these topics, and more. This book is full of practical advice and real-world examples in C, C++, Java, and a variety of special-purpose languages."--Jacket', -- Note: Storing a search link in the description field
    279,
    'https://coverart.oclc.org/ImageWebSvc/oclc/+-+35104059_140.jpg?allowDefault=false&client=WorldcatOrgUI'
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'F1',
    LAST_INSERT_ID()
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'F2',
    LAST_INSERT_ID()
);

INSERT INTO copies (
    copy_id, 
    book_id
) VALUES (
	'F3',
    LAST_INSERT_ID()
);
