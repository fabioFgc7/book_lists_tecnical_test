interface Props {
  range: number;
  setRange: (range: number) => void;
  genre: string;
  setGenre: (genre: string) => void;
  uniqueGenre: string[];
}
const NavBar = ({ range, setRange, genre, setGenre, uniqueGenre }: Props) => {
  return (
    <>
      <nav className=' px-5 '>
        <h1 className='text-xl text-center font-bold font-serif py-4'>
          Libros para leer
        </h1>
        <div className='gap-x-10 flex justify-center items-center'>
          <div className='grid'>
            <label
              htmlFor='range'
              className='flex flex-col'>
              Filtrar por paginas
              <input
                type='range'
                min={0}
                max={1300}
                value={range}
                onChange={(e) => setRange(parseInt(e.target.value))}
              />
            </label>
            <span>Paginas {range}</span>
          </div>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='h-auto'>
            {uniqueGenre.map((genre) => (
              <option
                key={genre}
                value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
