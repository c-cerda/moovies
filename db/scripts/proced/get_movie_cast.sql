DELIMITER $$

CREATE PROCEDURE get_movie_cast(IN movieId INT)
BEGIN
    SELECT 
        r.name AS role,
        GROUP_CONCAT(p.name) AS people
    FROM movie_cast mc
    JOIN people p ON mc.person_id = p.id
    JOIN roles r ON mc.role_id = r.id
    WHERE mc.movie_id = movieId
    GROUP BY r.name;
END$$

DELIMITER ;
