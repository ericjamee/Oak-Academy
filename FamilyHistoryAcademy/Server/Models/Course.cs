namespace Server.Models;

public class Course
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Slug { get; set; }
    public required string Title { get; set; }
    public int Order { get; set; }
    public required string Summary { get; set; }
    public bool IsPublished { get; set; } = true;

    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}


