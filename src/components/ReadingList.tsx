import { Book } from "../types";

interface Props {
  readListBook: Book[];
  animations: boolean;
  removeLecturas: (book: Book) => void;
}

export const ReadingList = ({
  readListBook,
  removeLecturas,
  animations,
}: Props) => {
  return (
    <div className='md:max-w-md w-full bg-slate-700 rounded-md md:px-5 h-full md:order-none order-first mb-10 overflow-x-hidden '>
      <h2 className='text-center font-semibold text-lg'>
        Lista de Lecturas ({readListBook.length})
      </h2>
      <ul className='flex flex-wrap gap-2 md:mt-5 mt-2 md:justify-center justify-start p-2 '>
        {readListBook.map((list) => (
          <li
            key={list.ISBN}
            className={`relative animate__animated ${
              animations ? "animate__slideInLeft" : ""
            }`}>
            <button
              onClick={() => removeLecturas(list)}
              className='absolute -top-4 -right-1 text-red-500 font-bold'>
              x
            </button>
            <img
              src={list.cover}
              className='md:w-20 md:h-32 w-12 h-20 rounded-md'
              alt=''
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
