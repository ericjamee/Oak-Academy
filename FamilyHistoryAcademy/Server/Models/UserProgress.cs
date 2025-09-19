namespace Server.Models;

public class UserProgress
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public required string CompletedLessonIds { get; set; } // JSON array of Guid strings
    public bool IsCourseCompleted { get; set; }
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

    public User? User { get; set; }
    public Course? Course { get; set; }
}


