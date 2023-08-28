import { Book, Library } from "../types";
import "animate.css";
interface Props {
  valor: Book[];
  items: number | null;
  genre: string;
  animations: boolean;
  handleAddList: (book: Library["book"], i: number) => void;
}
export const BookList = ({
  valor,
  handleAddList,
  animations,
  items,
  genre,
}: Props) => {
  return (
    <article className='font-serif  h-full w-full p-2 overflow-hidden'>
      <h2 className='text-lg font-sans pb-2 '>
        Libros disponibles:{" "}
        <span className='text-xl font-bold'>{valor.length + " "}</span>
        {genre === "Todos" ? genre : `de ${genre}`}
      </h2>
      {valor.length === 0 ? (
        <p className='text-lg  font-semibold font-serif text-center w-full'>
          No hay libros disponibles
        </p>
      ) : (
        <ul className='w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6 place-items-center h-full '>
          {valor.map((book, i) => (
            <li
              key={book.ISBN}
              onClick={() => handleAddList(book, i)}
              className={` 
              overflow-hidden rounded-md animate__animated w-auto h-full ${
                i === items && animations ? "" : "animate__slideInRight"
              } `}>
              <img
                className='md:w-52 md:h-60 w-40 h-48  rounded-md transition-all duration-300 hover:scale-105 hover:cursor-pointer '
                src={book.cover}
                alt={""}
              />
              <p className='font-serif mt-1'>{book.title}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
