DELIMITER $$

CREATE PROCEDURE register_user (
    IN p_username VARCHAR(30),
    IN p_name VARCHAR(30),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_milk_type VARCHAR(30)
)
BEGIN
    DECLARE v_user_id INT;
    DECLARE v_milk_id INT;

    -- Check if user exists
    IF EXISTS (
        SELECT 1 FROM users 
        WHERE username = p_username OR email = p_email
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario o correo ya existe';
    END IF;

    -- Insert user
    INSERT INTO users (username, name, email, password)
    VALUES (p_username, p_name, p_email, p_password);

    SET v_user_id = LAST_INSERT_ID();

    -- Get milk id
    SELECT id INTO v_milk_id
    FROM milks
    WHERE type = p_milk_type
    LIMIT 1;

    -- Insert relation
    IF v_milk_id IS NOT NULL THEN
        INSERT INTO users_milks (user_id, milk_id)
        VALUES (v_user_id, v_milk_id);
    END IF;

END$$

DELIMITER ;
