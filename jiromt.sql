CREATE TABLE effort (
	  id INT AUTO_INCREMENT PRIMARY KEY,
    hour NUMERIC,
    description VARCHAR(255),
    base_score NUMERIC,
    fun_score NUMERIC,

    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rewards (

)
SELECT * FROM records WHERE DATE(created_at) = DATE(now()) 
SELECT MONTH(created_at) FROM records
