namespace Server.Models;

public class Lesson
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public int Order { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }

    public Course? Course { get; set; }
}


