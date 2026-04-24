CREATE DATABASE EduSmartDB;
GO

USE EduSmartDB;
GO

CREATE TABLE Courses (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(100),
    Description VARCHAR(255),
    Price DECIMAL(10,2)
);
CREATE TABLE Enrollments (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100),
    Course VARCHAR(100),
    Date DATE
);

INSERT INTO Courses (Title, Description, Price)
VALUES 
('Angular Básico	', 'Aprende desde cero', 100),
('SQL Server', 'Base de datos profesional', 120);

INSERT INTO Enrollments (Name, Course, Date)
VALUES
('Ana Torres', 'Angular Básico', '2026-04-01'),
('Luis Pérez', 'SQL Server', '2026-04-05');

SELECT * FROM Courses;
SELECT * FROM Enrollments;


