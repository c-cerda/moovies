SELECT 
    c.id,
    c.content AS comment,
    c.rating,
    u.username,

    SUM(CASE WHEN cv.vote = 1 THEN 1 ELSE 0 END) AS likes,
    SUM(CASE WHEN cv.vote = -1 THEN 1 ELSE 0 END) AS dislikes,

    MAX(CASE 
        WHEN cv.user_id = ? THEN cv.vote 
        ELSE 0 
    END) AS user_vote

FROM comments c
JOIN users u ON c.user_id = u.id
LEFT JOIN comment_votes cv ON c.id = cv.comment_id

WHERE c.movie_id = ?

GROUP BY c.id
ORDER BY c.date DESC;
