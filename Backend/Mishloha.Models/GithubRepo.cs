namespace Mishloha.Models
{
    public class GithubRepo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreationDate { get; set; }

        public string Url { get; set; }

        public string Username { get; set; }

        public string AvatarUrl { get; set; }

        public int StarsCount { get; set; }

        public int ForksCount { get; set; }

        public string Language { get; set; }
    }
}