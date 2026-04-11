insert into contact values 
(1, "feriva00526@gmail.com", "Duda sobre MOOVIES", "Hola, tengo una duda sobre la página web...");

INSERT INTO genres (type) VALUES
('Acción'),
('Aventura'),
('Animación'),
('Comedia'),
('Crimen'),
('Documental'),
('Drama'),
('Fantasía'),
('Ciencia ficción'),
('Terror'),
('Misterio'),
('Romance'),
('Suspenso'),
('Bélico'),
('Histórico'),
('Musical'),
('Deporte'),
('Biografía'),
('Western'),
('Familia');

insert into milks (type) values 
('Entera'),
('Deslactosada'),
('Almendra');

INSERT INTO movies (id, title, description, summary, image, trailer) VALUES
(1, 'Interstellar',
'Exploradores cruzan un agujero de gusano para salvar a la humanidad.',
'Ambientada en un futuro donde la Tierra ya no puede sustentar a la humanidad, un grupo de astronautas emprende un viaje interestelar más allá de nuestra galaxia a través de un agujero de gusano. Cooper, ex piloto convertido en agricultor, lidera la misión que podría salvar a la especie. La película explora el amor filial, el tiempo dilatado y la física cuántica con una banda sonora icónica de Hans Zimmer.',
'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/f2e73310663523.560e8b9b60787.jpg',
'https://www.youtube.com/watch?v=zSWdZVtXT7E'),

(2, 'El lobo de Wall Street',
'Jordan Belfort y el exceso financiero en los años 90.',
'Basada en hechos reales, narra el ascenso y caída de Jordan Belfort, corredor de bolsa de Long Island que construyó un imperio de riqueza corrupta. Con humor salvaje y crítica social, Scorsese retrata la codicia, las drogas y el exceso de la cultura financiera de finales del siglo XX. Advertencia: humor adulto y escenas fuertes.',
'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
'https://www.youtube.com/watch?v=Pj0wz7zu3Ms'),

(3, 'Inception',
'Robo de secretos dentro de los sueños, capas de realidad.',
'Dom Cobb es un ladrón especializado en la extracción: roba secretos del subconsciente mientras la víctima sueña. Cuando se le ofrece la posibilidad de borrar su pasado a cambio de una tarea casi imposible —implantar una idea (inception)— debe liderar un equipo en distintos niveles oníricos. Una obra maestra visual y conceptual sobre la culpa, la memoria y la duda.',
'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
'https://www.youtube.com/watch?v=YoHD9XLrDyz'),

(4, 'El caballero oscuro',
'Batman contra el Joker en una batalla por el alma de Gotham.',
'Con la llegada del Joker, un criminal que desafía toda lógica, Batman, Gordon y Harvey Dent se ven arrastrados a un juego moral donde las reglas se rompen. La segunda entrega de la trilogía de Nolan redefine el cine de superhéroes con tensión, filosofía política y una actuación legendaria de Heath Ledger.',
'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
'https://www.youtube.com/watch?v=EXeTwQWrcwY'),

(5, 'Pulp Fiction',
'Historias cruzadas de crimen, humor negro y diálogos memorables.',
'Los destinos de dos sicarios, un boxeador, la esposa de un gánster y otros personajes se entrelazan en Los Ángeles en una narrativa no lineal. Tarantino revoluciona el cine independiente con diálogos eléctricos, violencia estilizada y referencias pop. Ganadora de la Palma de Oro y referencia cultural absoluta de los 90.',
'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
'https://www.youtube.com/watch?v=s7EdQnFqLCY'),

(6, 'Forrest Gump',
'La vida de un hombre simple en medio de la historia de EE. UU.',
'Forrest Gump no es el más listo de su pueblo, pero su corazón honesto lo lleva a vivir de todo: fútbol universitario, Vietnam, ping-pong internacional y un imperio de camarones. A través de su mirada ingenua recorremos décadas de historia estadounidense. Tom Hanks ofrece una actuación entrañable en una fábula sobre el destino y el amor.',
'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
'https://www.youtube.com/watch?v=bLvqoHBptTU'),

(7, 'Matrix',
'Neo descubre que el mundo es una simulación y elige despertar.',
'Thomas Anderson, hacker conocido como Neo, recibe un mensaje misterioso que lo conduce a Morfeo y a la verdad: la realidad percibida es Matrix, una simulación creada por máquinas. Revolución visual con bullet time, artes marciales y filosofía. Una obra que definió el cine de ciencia ficción de finales de los 90.',
'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
'https://www.youtube.com/watch?v=vKQi3bBA1y8'),

(8, 'Gladiator',
'Un general romano busca venganza en la arena.',
'Máximo Decimo Meridio es traicionado cuando Cómodo asesina a su padre y toma el trono. Esclavizado como gladiador, su furia y honor lo convierten en leyenda en el Coliseo. Ridley Scott combina espectáculo épico, drama político y una banda sonora inolvidable de Hans Zimmer y Lisa Gerrard.',
'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png',
'https://www.youtube.com/watch?v=ow5aMvDtVxg'),

(9, 'Titanic',
'Un romance imposible a bordo del transatlántico más famoso.',
'Jack y Rose se conocen en el viaje inaugural del RMS Titanic en 1912: él es un artista sin recursos, ella una joven atrapada en un compromiso impuesto por su clase. James Cameron combina romance épico, reconstrucción histórica y tragedia marítima con efectos que marcaron época. Una de las películas más taquilleras de la historia.',
'https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png',
'https://www.youtube.com/watch?v=2CD5l7xQ70M'),

(10, 'Avatar',
'Un marine en Pandora entre dos mundos y una guerra por recursos.',
'Jake Sully pilota un avatar Na''vi para infiltrarse en Pandora, pero su conexión con el planeta y con Neytiri lo obliga a elegir bando. James Cameron redefine el blockbuster con 3D inmersivo, diseño de mundos y un mensaje ecológico. Una experiencia visual que renovó el interés por el cine en 3D.',
'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg',
'https://www.youtube.com/watch?v=5PSNL1qE6VY'),

(11, 'Parque Jurásico',
'Dinosaurios clonados y un parque temático que pierde el control.',
'En la isla Nublar, el multimillonario John Hammond abre un parque con dinosaurios recreados por ADN. Un grupo de especialistas visita la instalación el mismo día que un fallo eléctrico libera a los depredadores. Spielberg mezcla asombro infantil y terror adulto; revolucionó los efectos con animatrónica y CGI.',
'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
'https://www.youtube.com/watch?v=RFinNxS5KN4'),

(12, 'Terminator 2: El juicio final',
'Un T-800 protege a John Connor del T-1000.',
'Sarah Connor prepara a su hijo John para el futuro apocalíptico mientras un Terminator T-800 reprogramado lo protege del letal T-1000. Cameron eleva la acción con efectos revolucionarios para el T-1000 líquido y una historia sobre el destino y la redención. Arnold Schwarzenegger en su papel más icónico.',
'https://image.tmdb.org/t/p/w500/wevxK10KhRKoCYSCHRNkzC1q1PL.jpg',
'https://www.youtube.com/watch?v=CRRlbKAWwGg'),

(13, 'Regreso al futuro',
'Marty viaje a 1955 y debe reunir a sus padres para volver.',
'Marty McFly accidentalmente viaja a 1955 en un DeLorean convertido en máquina del tiempo por el Doc Brown. Debe asegurar que sus padres se enamoren o dejará de existir. Comedia familiar perfecta con ritmo, chistes y una banda sonora inolvidable. Trilogía de referencia de los 80.',
'https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg',
'https://www.youtube.com/watch?v=qvsgGtivCsg'),

(14, 'El padrino',
'La familia Corleone y el poder en el crimen organizado.',
'Don Vito Corleone es el patriarca de una familia mafiosa en Nueva York. Cuando le piden entrar en el negocio de las drogas, estalla un conflicto que arrastra a sus hijos Michael, Sonny y Fredo. Coppola redefine el gánster con Shakespeare, silencios incómodos y una fotografía cálida y sombría.',
'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
'https://www.youtube.com/watch?v=Ua4lVJUPrKg'),

(15, 'El club de la lucha',
'Un insomne y un carismático Tyler crean un club clandestino.',
'El narrador, un oficinista insomne, conoce a Tyler Durden y fundan un club de pelea subterráneo que crece hasta convertirse en algo más oscuro. Fincher dirige con estética sucia y giros narrativos memorables. Adaptación de Chuck Palahniuk sobre identidad, consumo y rebelión.',
'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
'https://www.youtube.com/watch?v=SUXWAEX2Ilg'),

(16, 'La lista de Schindler',
'Oskar Schindler salva judíos empleándolos en sus fábricas.',
'Durante el Holocausto, el empresario alemán Oskar Schindler emplea a más de mil judíos en sus fábricas para salvarlos de los campos de exterminio. Spielberg filma en blanco y negro con humanidad sobrecogedora. Ganadora de múltiples Óscar, incluida mejor película y director.',
'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
'https://www.youtube.com/watch?v=gG22XNhtnoY'),

(17, 'Uno de los nuestros',
'Henry Hill y la mafia italiana de Nueva York.',
'Desde niño, Henry Hill sueña con pertenecer a la mafia. Scorsese narra décadas de ascenso y caída con voz en off frenética, planos secuencia icónicos y montaje vertiginoso. Ray Liotta, Joe Pesci y Robert De Niro en una de las mejores películas de gánsteres jamás filmadas.',
'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
'https://www.youtube.com/watch?v=2ilzidi_J8Q'),

(18, 'Cadena perpetua',
'Esperanza y amistad en la prisión de Shawshank.',
'Andy Dufresne es condenado por un crimen que no cometió y forja amistad con Red en la penitenciaría de Shawshank. Con paciencia y dignidad, busca la libertad. Basada en Stephen King, es una reflexión sobre la esperanza y la injusticia con final memorable.',
'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
'https://www.youtube.com/watch?v=NmzuHCHWEqI'),

(19, 'Star Wars: Una nueva esperanza',
'Luke, Han y Leia contra el Imperio y la Estrella de la Muerte.',
'La princesa Leia envía los planos de la Estrella de la Muerte a través de R2-D2. Luke Skywalker, Obi-Wan Kenobi y Han Solo unen fuerzas para rescatarla y destruir la superarma. George Lucas inventa un universo de ciencia ficción serial con efectos que cambiaron la industria.',
'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg',
'https://www.youtube.com/watch?v=1g3_CFmnf7Q');

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 1, id FROM genres WHERE type = 'Ciencia ficción';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 2, id FROM genres WHERE type = 'Comedia';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 3, id FROM genres WHERE type = 'Ciencia ficción';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 4, id FROM genres WHERE type = 'Acción';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 5, id FROM genres WHERE type = 'Crimen';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 6, id FROM genres WHERE type = 'Drama';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 7, id FROM genres WHERE type = 'Ciencia ficción';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 8, id FROM genres WHERE type = 'Aventura';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 9, id FROM genres WHERE type = 'Romance';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 10, id FROM genres WHERE type = 'Ciencia ficción';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 11, id FROM genres WHERE type = 'Aventura';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 12, id FROM genres WHERE type = 'Ciencia ficción';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 13, id FROM genres WHERE type = 'Aventura';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 14, id FROM genres WHERE type = 'Crimen';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 15, id FROM genres WHERE type = 'Drama';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 16, id FROM genres WHERE type = 'Drama';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 17, id FROM genres WHERE type = 'Crimen';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 18, id FROM genres WHERE type = 'Drama';

INSERT INTO movies_genres (movie_id, genre_id)
SELECT 19, id FROM genres WHERE type = 'Ciencia ficción';

INSERT INTO users (username, name, email, password) VALUES
('cine_vaca', 'Cine Vaca', 'cine.vaca@gmail.com', 'moo123'),
('leche_galaxy', 'Leche Galaxy', 'galaxy@gmail.com', 'moo123'),
('moo_fan', 'Moo Fan', 'moofan@gmail.com', 'moo123'),
('palomitas_mx', 'Palomitas MX', 'palomitas@gmail.com', 'moo123'),
('critico_leche', 'Crítico Leche', 'critico@gmail.com', 'moo123'),
('sillon_comodo', 'Sillón Cómodo', 'sillon@gmail.com', 'moo123'),
('bluray_hd', 'Blu-ray HD', 'bluray@gmail.com', 'moo123'),
('soundtrack_lover', 'Soundtrack Lover', 'ost@gmail.com', 'moo123'),
('spoiler_alert', 'Spoiler Alert', 'spoiler@gmail.com', 'moo123'),
('cinefilo_00', 'Cinéfilo 00', 'cinefilo@gmail.com', 'moo123'),
('maraton_nocturno', 'Maratón Nocturno', 'maraton@gmail.com', 'moo123'),
('director_sofa', 'Director Sofá', 'sofa@gmail.com', 'moo123'),
('pop_corn_king', 'Pop Corn King', 'pop@gmail.com', 'moo123'),
('matinee_sol', 'Matinee Sol', 'matinee@gmail.com', 'moo123'),
('subtitulos_ok', 'Subtítulos OK', 'subs@gmail.com', 'moo123'),
('imax_dream', 'IMAX Dream', 'imax@gmail.com', 'moo123'),
('festival_moo', 'Festival Moo', 'festival@gmail.com', 'moo123'),
('rollo_camara', 'Rollo Cámara', 'rollo@gmail.com', 'moo123'),
('claqueta_azul', 'Claqueta Azul', 'claqueta@gmail.com', 'moo123'),
('vaquero_lacteo', 'admin', 'admin@gmail.com', '1234');

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'cine_vaca' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'leche_galaxy' AND m.type = 'Deslactosada';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'moo_fan' AND m.type = 'Almendra';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'palomitas_mx' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'critico_leche' AND m.type = 'Deslactosada';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'sillon_comodo' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'bluray_hd' AND m.type = 'Almendra';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'soundtrack_lover' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'spoiler_alert' AND m.type = 'Deslactosada';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'cinefilo_00' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'maraton_nocturno' AND m.type = 'Almendra';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'director_sofa' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'pop_corn_king' AND m.type = 'Deslactosada';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'matinee_sol' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'subtitulos_ok' AND m.type = 'Almendra';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'imax_dream' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'festival_moo' AND m.type = 'Deslactosada';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'rollo_camara' AND m.type = 'Entera';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'claqueta_azul' AND m.type = 'Almendra';

INSERT INTO users_milks (user_id, milk_id)
SELECT u.id, m.id FROM users u, milks m
WHERE u.username = 'vaquero_lacteo' AND m.type = 'Entera';

insert into comments(movie_id, user_id, content, rating) values
("1", "1", "meh", 2), 
("2", "2", "no lo recomendaria", 2), 
("5", "2", "excelente ritmo", 3), 
("3", "3", "esos efectos wow", 3), 
("4", "2", "merece paciencia", 4), 
("5", "4", "el mejor actor de todos", 4), 
("6", "2", "genialidad pura", 5), 
("7", "1", "no hay nada mejor", 5), 
("8", "5", "mejor mi*rda", 1), 
("9", "6", "igual que emilia perez", 1), 
("6", "8", "grandiosaaaa", 4), 
("7", "8", "horrible", 2), 
("8", "16", "mi peli fav", 5), 
("9", "18", "genial", 4), 
("10", "14", "no la vean", 2), 
("11", "20", "green lantern estuvo mejor", 2), 
("12", "8", "terrible", 2), 
("12", "9", "cuando gana un oscar", 5), 
("12", "12", "la vi dos veces", 4), 
("11", "11", "mala", 2), 
("14", "19", "buena para pasar el rato", 3), 
("12", "10", "aburrida", 2), 
("10", "9", "mid", 3);

INSERT IGNORE INTO roles (name) VALUES
('actor'),
('director'),
('writer'),
('composer');

INSERT INTO people (name) VALUES
('Christopher Nolan'),
('Jonathan Nolan'),
('Hans Zimmer'),
('Matthew McConaughey'),
('Anne Hathaway'),
('Jessica Chastain'),
('Michael Caine'),

('Martin Scorsese'),
('Howard Shore'),
('Terence Winter'),
('Leonardo DiCaprio'),
('Jonah Hill'),
('Margot Robbie'),

('Joseph Gordon-Levitt'),
('Elliot Page'),
('Tom Hardy'),

('Christian Bale'),
('Heath Ledger'),
('Aaron Eckhart'),

('Quentin Tarantino'),
('Roger Avary'),
('John Travolta'),
('Samuel L. Jackson'),
('Uma Thurman'),
('Bruce Willis'),

('Robert Zemeckis'),
('Alan Silvestri'),
('Eric Roth'),
('Tom Hanks'),
('Robin Wright'),
('Gary Sinise'),
('Sally Field'),

('Lana Wachowski'),
('Lilly Wachowski'),
('Don Davis'),
('Keanu Reeves'),
('Laurence Fishburne'),
('Carrie-Anne Moss'),
('Hugo Weaving'),

('Ridley Scott'),
('Lisa Gerrard'),
('Russell Crowe'),
('Joaquin Phoenix'),
('Connie Nielsen'),
('Oliver Reed'),

('James Cameron'),
('James Horner'),
('Kate Winslet'),
('Billy Zane'),
('Kathy Bates'),

('Sam Worthington'),
('Zoe Saldaña'),
('Sigourney Weaver'),
('Stephen Lang'),

('Steven Spielberg'),
('John Williams'),
('Michael Crichton'),
('Michael Koepp'),
('Sam Neill'),
('Laura Dern'),
('Jeff Goldblum'),
('Richard Attenborough'),

('Brad Fiedel'),
('William Wisher'),
('Arnold Schwarzenegger'),
('Linda Hamilton'),
('Edward Furlong'),
('Robert Patrick'),

('Bob Gale'),
('Michael J. Fox'),
('Christopher Lloyd'),
('Lea Thompson'),
('Crispin Glover'),

('Francis Ford Coppola'),
('Nino Rota'),
('Mario Puzo'),
('Marlon Brando'),
('Al Pacino'),
('James Caan'),
('Robert Duvall'),

('David Fincher'),
('The Dust Brothers'),
('Jim Uhls'),
('Brad Pitt'),
('Edward Norton'),
('Helena Bonham Carter'),
('Meat Loaf'),

('Steven Zaillian'),
('Thomas Keneally'),
('Liam Neeson'),
('Ben Kingsley'),
('Ralph Fiennes'),
('Embeth Davidtz'),

('Nicholas Pileggi'),
('Ray Liotta'),
('Joe Pesci'),
('Lorraine Bracco'),

('Frank Darabont'),
('Thomas Newman'),
('Tim Robbins'),
('Morgan Freeman'),
('Bob Gunton'),
('William Sadler'),

('George Lucas'),
('Mark Hamill'),
('Harrison Ford'),
('Carrie Fisher'),
('Alec Guinness');

-- =========================
-- 1. INTERSTELLAR
-- =========================
INSERT INTO movie_cast
SELECT 1, p.id, r.id FROM people p, roles r
WHERE p.name = 'Christopher Nolan' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 1, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Christopher Nolan','Jonathan Nolan') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 1, p.id, r.id FROM people p, roles r
WHERE p.name = 'Hans Zimmer' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 1, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Matthew McConaughey','Anne Hathaway','Jessica Chastain','Michael Caine') AND r.name = 'actor';

-- =========================
-- 2. EL LOBO DE WALL STREET
-- =========================
INSERT INTO movie_cast
SELECT 2, p.id, r.id FROM people p, roles r
WHERE p.name = 'Martin Scorsese' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 2, p.id, r.id FROM people p, roles r
WHERE p.name = 'Terence Winter' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 2, p.id, r.id FROM people p, roles r
WHERE p.name = 'Howard Shore' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 2, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Leonardo DiCaprio','Jonah Hill','Margot Robbie','Matthew McConaughey') AND r.name = 'actor';

-- =========================
-- 3. INCEPTION
-- =========================
INSERT INTO movie_cast
SELECT 3, p.id, r.id FROM people p, roles r
WHERE p.name = 'Christopher Nolan' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 3, p.id, r.id FROM people p, roles r
WHERE p.name = 'Christopher Nolan' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 3, p.id, r.id FROM people p, roles r
WHERE p.name = 'Hans Zimmer' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 3, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Leonardo DiCaprio','Joseph Gordon-Levitt','Elliot Page','Tom Hardy') AND r.name = 'actor';

-- =========================
-- 4. EL CABALLERO OSCURO
-- =========================
INSERT INTO movie_cast
SELECT 4, p.id, r.id FROM people p, roles r
WHERE p.name = 'Christopher Nolan' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 4, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Christopher Nolan','Jonathan Nolan') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 4, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Hans Zimmer','James Newton Howard') AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 4, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Christian Bale','Heath Ledger','Aaron Eckhart','Michael Caine') AND r.name = 'actor';

-- =========================
-- 5. PULP FICTION
-- =========================
INSERT INTO movie_cast
SELECT 5, p.id, r.id FROM people p, roles r
WHERE p.name = 'Quentin Tarantino' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 5, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Quentin Tarantino','Roger Avary') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 5, p.id, r.id FROM people p, roles r
WHERE p.name IN ('John Travolta','Samuel L. Jackson','Uma Thurman','Bruce Willis') AND r.name = 'actor';

-- =========================
-- 6. FORREST GUMP
-- =========================
INSERT INTO movie_cast
SELECT 6, p.id, r.id FROM people p, roles r
WHERE p.name = 'Robert Zemeckis' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 6, p.id, r.id FROM people p, roles r
WHERE p.name = 'Eric Roth' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 6, p.id, r.id FROM people p, roles r
WHERE p.name = 'Alan Silvestri' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 6, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Tom Hanks','Robin Wright','Gary Sinise','Sally Field') AND r.name = 'actor';

-- =========================
-- 7. MATRIX
-- =========================
INSERT INTO movie_cast
SELECT 7, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Lana Wachowski','Lilly Wachowski') AND r.name = 'director';

INSERT INTO movie_cast
SELECT 7, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Lana Wachowski','Lilly Wachowski') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 7, p.id, r.id FROM people p, roles r
WHERE p.name = 'Don Davis' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 7, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Keanu Reeves','Laurence Fishburne','Carrie-Anne Moss','Hugo Weaving') AND r.name = 'actor';

-- =========================
-- 8. GLADIATOR
-- =========================
INSERT INTO movie_cast
SELECT 8, p.id, r.id FROM people p, roles r
WHERE p.name = 'Ridley Scott' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 8, p.id, r.id FROM people p, roles r
WHERE p.name IN ('David Franzoni','John Logan','William Nicholson') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 8, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Hans Zimmer','Lisa Gerrard') AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 8, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Russell Crowe','Joaquin Phoenix','Connie Nielsen','Oliver Reed') AND r.name = 'actor';

-- =========================
-- 9. TITANIC
-- =========================
INSERT INTO movie_cast
SELECT 9, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Cameron' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 9, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Cameron' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 9, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Horner' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 9, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Leonardo DiCaprio','Kate Winslet','Billy Zane','Kathy Bates') AND r.name = 'actor';

-- =========================
-- 10. AVATAR
-- =========================
INSERT INTO movie_cast
SELECT 10, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Cameron' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 10, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Cameron' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 10, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Horner' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 10, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Sam Worthington','Zoe Saldaña','Sigourney Weaver','Stephen Lang') AND r.name = 'actor';

-- =========================
-- 11. PARQUE JURÁSICO
-- =========================
INSERT INTO movie_cast
SELECT 11, p.id, r.id FROM people p, roles r
WHERE p.name = 'Steven Spielberg' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 11, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Michael Crichton','Michael Koepp') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 11, p.id, r.id FROM people p, roles r
WHERE p.name = 'John Williams' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 11, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Sam Neill','Laura Dern','Jeff Goldblum','Richard Attenborough') AND r.name = 'actor';

-- =========================
-- 12. TERMINATOR 2
-- =========================
INSERT INTO movie_cast
SELECT 12, p.id, r.id FROM people p, roles r
WHERE p.name = 'James Cameron' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 12, p.id, r.id FROM people p, roles r
WHERE p.name IN ('James Cameron','William Wisher') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 12, p.id, r.id FROM people p, roles r
WHERE p.name = 'Brad Fiedel' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 12, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Arnold Schwarzenegger','Linda Hamilton','Edward Furlong','Robert Patrick') AND r.name = 'actor';

-- =========================
-- 13. REGRESO AL FUTURO
-- =========================
INSERT INTO movie_cast
SELECT 13, p.id, r.id FROM people p, roles r
WHERE p.name = 'Robert Zemeckis' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 13, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Robert Zemeckis','Bob Gale') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 13, p.id, r.id FROM people p, roles r
WHERE p.name = 'Alan Silvestri' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 13, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Michael J. Fox','Christopher Lloyd','Lea Thompson','Crispin Glover') AND r.name = 'actor';

-- =========================
-- 14. EL PADRINO
-- =========================
INSERT INTO movie_cast
SELECT 14, p.id, r.id FROM people p, roles r
WHERE p.name = 'Francis Ford Coppola' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 14, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Mario Puzo','Francis Ford Coppola') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 14, p.id, r.id FROM people p, roles r
WHERE p.name = 'Nino Rota' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 14, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Marlon Brando','Al Pacino','James Caan','Robert Duvall') AND r.name = 'actor';

-- =========================
-- 15. EL CLUB DE LA LUCHA
-- =========================
INSERT INTO movie_cast
SELECT 15, p.id, r.id FROM people p, roles r
WHERE p.name = 'David Fincher' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 15, p.id, r.id FROM people p, roles r
WHERE p.name = 'Jim Uhls' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 15, p.id, r.id FROM people p, roles r
WHERE p.name = 'The Dust Brothers' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 15, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Brad Pitt','Edward Norton','Helena Bonham Carter','Meat Loaf') AND r.name = 'actor';

-- =========================
-- 16. LA LISTA DE SCHINDLER
-- =========================
INSERT INTO movie_cast
SELECT 16, p.id, r.id FROM people p, roles r
WHERE p.name = 'Steven Spielberg' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 16, p.id, r.id FROM people p, roles r
WHERE p.name = 'Steven Zaillian' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 16, p.id, r.id FROM people p, roles r
WHERE p.name = 'John Williams' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 16, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Liam Neeson','Ben Kingsley','Ralph Fiennes','Embeth Davidtz') AND r.name = 'actor';

-- =========================
-- 17. UNO DE LOS NUESTROS
-- =========================
INSERT INTO movie_cast
SELECT 17, p.id, r.id FROM people p, roles r
WHERE p.name = 'Martin Scorsese' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 17, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Nicholas Pileggi','Martin Scorsese') AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 17, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Robert De Niro','Ray Liotta','Joe Pesci','Lorraine Bracco') AND r.name = 'actor';

-- =========================
-- 18. CADENA PERPETUA
-- =========================
INSERT INTO movie_cast
SELECT 18, p.id, r.id FROM people p, roles r
WHERE p.name = 'Frank Darabont' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 18, p.id, r.id FROM people p, roles r
WHERE p.name = 'Frank Darabont' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 18, p.id, r.id FROM people p, roles r
WHERE p.name = 'Thomas Newman' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 18, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Tim Robbins','Morgan Freeman','Bob Gunton','William Sadler') AND r.name = 'actor';

-- =========================
-- 19. STAR WARS
-- =========================
INSERT INTO movie_cast
SELECT 19, p.id, r.id FROM people p, roles r
WHERE p.name = 'George Lucas' AND r.name = 'director';

INSERT INTO movie_cast
SELECT 19, p.id, r.id FROM people p, roles r
WHERE p.name = 'George Lucas' AND r.name = 'writer';

INSERT INTO movie_cast
SELECT 19, p.id, r.id FROM people p, roles r
WHERE p.name = 'John Williams' AND r.name = 'composer';

INSERT INTO movie_cast
SELECT 19, p.id, r.id FROM people p, roles r
WHERE p.name IN ('Mark Hamill','Harrison Ford','Carrie Fisher','Alec Guinness') AND r.name = 'actor';
