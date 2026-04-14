DELIMITER $$

CREATE PROCEDURE get_full_movie(IN movieId INT, IN currentUserId INT)
BEGIN

SELECT 
    m.id,
    m.title,
    m.description,
    m.summary,
    m.image,
    m.trailer,

    GROUP_CONCAT(DISTINCT g.type) AS genres,

    GROUP_CONCAT(DISTINCT CASE WHEN r.name = 'director' THEN p.name END) AS directors,
    GROUP_CONCAT(DISTINCT CASE WHEN r.name = 'actor' THEN p.name END) AS actors,
    GROUP_CONCAT(DISTINCT CASE WHEN r.name = 'writer' THEN p.name END) AS writers,
    GROUP_CONCAT(DISTINCT CASE WHEN r.name = 'composer' THEN p.name END) AS composers

FROM movies m
LEFT JOIN movies_genres mg ON m.id = mg.movie_id
LEFT JOIN genres g ON mg.genre_id = g.id
LEFT JOIN movie_cast mc ON m.id = mc.movie_id
LEFT JOIN people p ON mc.person_id = p.id
LEFT JOIN roles r ON mc.role_id = r.id

WHERE m.id = movieId
GROUP BY m.id;

SELECT 
    c.id,
    c.content AS comment,
    c.rating,
    c.user_id,
    u.username,

    SUM(CASE WHEN cv.vote = 1 THEN 1 ELSE 0 END) AS likes,
    SUM(CASE WHEN cv.vote = -1 THEN 1 ELSE 0 END) AS dislikes,

    MAX(CASE 
        WHEN cv.user_id = currentUserId THEN cv.vote 
        ELSE 0 
    END) AS user_vote,

    CASE 
        WHEN c.user_id = currentUserId THEN 1 
        ELSE 0 
    END AS is_owner

FROM comments c
JOIN users u ON c.user_id = u.id
LEFT JOIN comment_votes cv ON c.id = cv.comment_id

WHERE c.movie_id = movieId

GROUP BY c.id
ORDER BY c.date DESC;

END$$

DELIMITER ;
