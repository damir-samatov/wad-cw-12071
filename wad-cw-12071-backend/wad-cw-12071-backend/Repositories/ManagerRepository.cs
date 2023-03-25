using wad_cw_12071_backend.Data;
using wad_cw_12071_backend.Interfaces;
using wad_cw_12071_backend.Models;

namespace wad_cw_12071_backend.Repository
{
    public class ManagerRepository : IRepository<Manager>
    {
        public ManagerRepository( DataContext dbContext )
        {
            _dbContext = dbContext;
        }

        private readonly DataContext _dbContext;

        public IEnumerable<Manager> GetAll()
        {
            return _dbContext.Managers.ToList();
        }

        public Manager? GetOne( int id )
        {
            return _dbContext.Managers.Find(id);
        }

        public bool Insert( Manager manager )
        {
            try
            {
                _dbContext.Add(manager);

                Save();

                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool Update( Manager manager )
        {
            try
            {
                _dbContext.Managers.Update(manager);

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
                var manager = GetOne(id);

                if ( manager == null ) return false;

                _dbContext.Managers.Remove(manager);

                Save();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public bool isPresent( int id )
        {
            return _dbContext.Managers.Any(manager => manager.Id == id);
        }
    }
}
