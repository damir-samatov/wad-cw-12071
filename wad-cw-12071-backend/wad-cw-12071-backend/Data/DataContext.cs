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
        }
    }
}
