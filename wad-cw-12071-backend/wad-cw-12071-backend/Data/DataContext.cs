using Microsoft.EntityFrameworkCore;
using wad_cw_12071_backend.Models;

namespace wad_cw_12071_backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Manager> Managers { get; set; }

        public DbSet<ManagerSession> ManagerSessions { get; set; }

        public DbSet<EmployeeSession> EmployeeSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Manager>().HasData(
                new Manager()
                {
                    Id = 1,
                    Login = "Manager12071",
                    Password = "Manager12071",
                }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee()
                {
                    Id = 1,
                    Login = "employee1",
                    Password = "employee1",
                    JobTitle = "JobTitle",
                    FirstName = "FirstName",
                    LastName = "LastName",
                    Bio = "Bio"
                },
                new Employee()
                {
                    Id = 2,
                    Login = "employee2",
                    Password = "employee2",
                    JobTitle = "JobTitle",
                    FirstName = "FirstName",
                    LastName = "LastName",
                    Bio = "Bio"
                },
                new Employee()
                {
                    Id = 3,
                    Login = "employee3",
                    Password = "employee3",
                    JobTitle = "JobTitle",
                    FirstName = "FirstName",
                    LastName = "LastName",
                    Bio = "Bio"
                }
            );

            modelBuilder.Entity<Ticket>().HasData(
                new Ticket()
                {
                    Id = 1,
                    EmployeeId = 1,
                    Title = "Ticket Title",
                    Description = "Description",
                    Status = "TO DO",
                    Priority = "Medium",
                },
                new Ticket()
                {
                    Id = 2,
                    EmployeeId = 2,
                    Title = "Ticket Title",
                    Description = "Description",
                    Status = "TO DO",
                    Priority = "Medium",
                },
                new Ticket()
                {
                    Id = 3,
                    EmployeeId = 3,
                    Title = "Ticket Title",
                    Description = "Description",
                    Status = "TO DO",
                    Priority = "Medium",
                }
            );
        }
    }
}
