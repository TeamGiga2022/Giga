CREATE TABLE attachment (
    id         NUMBER(10) NOT NULL,
    attachment VARCHAR2(30),
    email_id   NUMBER(10) NOT NULL
);

ALTER TABLE attachment ADD CONSTRAINT attachment_pk PRIMARY KEY ( id );

CREATE TABLE audio (
    id        NUMBER(10) NOT NULL,
    audio_msg BLOB,
    email_id  NUMBER(10) NOT NULL
);

CREATE UNIQUE INDEX audio__idx ON
    audio (
        email_id
    ASC );

ALTER TABLE audio ADD CONSTRAINT audio_pk PRIMARY KEY ( id );

CREATE TABLE contact (
    id       NUMBER(10) NOT NULL,
    name     VARCHAR2(10),
    address  VARCHAR2(50),
    phone_nr NUMBER(15),
    email    VARCHAR2(30)
);

ALTER TABLE contact ADD CONSTRAINT contact_pk PRIMARY KEY ( id );

CREATE TABLE email (
    id       NUMBER(10) NOT NULL,
    sender   VARCHAR2(30),
    receiver VARCHAR2(30),
    cc       VARCHAR2(20),
    bcc      VARCHAR2(20),
    subject  VARCHAR2(30),
    message  VARCHAR(600),
    user_id  NUMBER(10) NOT NULL
);

ALTER TABLE email ADD CONSTRAINT email_pk PRIMARY KEY ( id );

CREATE TABLE email_contact (
    email_id   NUMBER(10) NOT NULL,
    contact_id NUMBER(10) NOT NULL
);

ALTER TABLE email_contact ADD CONSTRAINT email_contact_pk PRIMARY KEY ( email_id,
                                                                        contact_id );

CREATE TABLE note (
    id           NUMBER(10) NOT NULL,
    "Date"       DATE,
    activity     VARCHAR2(30),
    worker_notes VARCHAR2(30),
    follow_up    VARCHAR2(30)
);

ALTER TABLE note ADD CONSTRAINT note_pk PRIMARY KEY ( id );

CREATE TABLE "User" (
    id       NUMBER(10) NOT NULL,
    name     VARCHAR2(20),
    address  VARCHAR2(30),
    username VARCHAR2(8),
    password NUMBER(10)
);

ALTER TABLE "User" ADD CONSTRAINT user_pk PRIMARY KEY ( id );

CREATE TABLE user_note (
    user_id NUMBER(10) NOT NULL,
    note_id NUMBER(10) NOT NULL
);

ALTER TABLE user_note ADD CONSTRAINT user_note_pk PRIMARY KEY ( user_id,
                                                                note_id );

ALTER TABLE attachment
    ADD CONSTRAINT attachment_email_fk FOREIGN KEY ( email_id )
        REFERENCES email ( id );

ALTER TABLE audio
    ADD CONSTRAINT audio_email_fk FOREIGN KEY ( email_id )
        REFERENCES email ( id );

ALTER TABLE email_contact
    ADD CONSTRAINT email_contact_contact_fk FOREIGN KEY ( contact_id )
        REFERENCES contact ( id );

ALTER TABLE email_contact
    ADD CONSTRAINT email_contact_email_fk FOREIGN KEY ( email_id )
        REFERENCES email ( id );

ALTER TABLE email
    ADD CONSTRAINT email_user_fk FOREIGN KEY ( user_id )
        REFERENCES "User" ( id );

ALTER TABLE user_note
    ADD CONSTRAINT user_note_note_fk FOREIGN KEY ( note_id )
        REFERENCES note ( id );

ALTER TABLE user_note
    ADD CONSTRAINT user_note_user_fk FOREIGN KEY ( user_id )
        REFERENCES "User" ( id );