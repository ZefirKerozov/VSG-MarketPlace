DECLARE @ImageUrl VARCHAR(100)
DECLARE @RandomNumber INT
DECLARE @Counter INT

SET @Counter = 0

WHILE @Counter < 500
BEGIN
    SET @RandomNumber = CAST(RAND() * 500 AS INT)
    SET @ImageUrl = 'https://picsum.photos/200/300?random=' + CAST(@RandomNumber AS VARCHAR)
    INSERT INTO Images (img)
    VALUES ( @ImageUrl)
    SET @Counter = @Counter + 1
END