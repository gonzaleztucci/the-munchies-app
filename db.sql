--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurants (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    location character varying(50) NOT NULL,
    price_range integer NOT NULL,
    CONSTRAINT restaurants_price_range_check CHECK (((price_range >= 1) AND (price_range <= 5)))
);


ALTER TABLE public.restaurants OWNER TO postgres;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurants_id_seq OWNER TO postgres;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    text text NOT NULL,
    rating integer NOT NULL,
    restaurant_id bigint NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants (id, name, location, price_range) FROM stdin;
20	Trattoria Haro	Cabanyal	2
29	Restaurant Chino	Valencia	2
28	Indio de Nadine	Casa de Nadine	5
19	Bar Cabanyal	Valencia	2
32	Prueba 2	Pruebaland 2	2
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, name, text, rating, restaurant_id) FROM stdin;
\.


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 32, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 37, true);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT restaurants_id_fk FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- PostgreSQL database dump complete
--

