using wad_cw_12071_backend.Data;
using wad_cw_12071_backend.Interfaces;
using wad_cw_12071_backend.Models;

namespace wad_cw_12071_backend.Repository
{
    public class TicketRepository : IRepository<Ticket>
    {
        public TicketRepository( DataContext dbContext )
        {
            _dbContext = dbContext;
        }

        private readonly DataContext _dbContext;

        public IEnumerable<Ticket> GetAll()
        {
            return _dbContext.Tickets.ToList();
        }

        public Ticket? GetOne( int id )
        {
            return _dbContext.Tickets.Find(id);
        }

        public IEnumerable<Ticket> GetAllForEmployee( int employeeId )
        {
            return _dbContext.Tickets.Where(t => t.EmployeeId == employeeId).ToList();
        }

        public Ticket? GetOneForEmployee( int id, int employeeId )
        {
            return _dbContext.Tickets.Where(t => t.Id == id && t.EmployeeId == employeeId).FirstOrDefault();
        }

        public bool Insert( Ticket ticket )
        {
            try
            {
                _dbContext.Add(ticket);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Update( Ticket ticket )
        {
            try
            {
                _dbContext.Tickets.Update(ticket);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete( int id )
        {
            try
            {
                var ticket = GetOne(id);

                if ( ticket == null ) return false;

                _dbContext.Tickets.Remove(ticket);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool isPresent( int id )
        {
            return _dbContext.Tickets.Any(ticket => ticket.Id == id);
        }
        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
