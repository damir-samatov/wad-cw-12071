namespace wad_cw_12071_backend.Interfaces
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        T? GetOne( int Id );

        bool Insert( T entity );

        bool Update( T entity );

        bool Delete( int id );

        bool isPresent( int id );

        void Save();
    }
}
