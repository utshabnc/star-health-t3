import { capitalize } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { formatName } from '../../utils';
// import './index.css';

// .buttonText {
//   color: white;
// }

interface ResultSchema {
  id: string;
  name: string;
  location: string;
  type: 'doctor' | 'manufacturer';
}

const tableHeaders =
  [{ title: 'Type' }, { title: 'Name' }, { title: 'Location' }]

  // const tableHeaders =
//   screen.width > 1000
//     ? [{ title: 'Type' }, { title: 'Name' }, { title: 'Location' }]
//     : [{ title: 'Name' }, { title: 'Location' }];

function DetailsTable({ rows }: { rows: ResultSchema[] }) {
  const navigation = useRouter();
  return (
    <>
      <section className='antialiased text-gray-600 py-4' x-data='app'>
        <div className='flex flex-row'>
          <div className='max-h-[300px] overflow-scroll mx-auto bg-white shadow-lg rounded-lg border border-gray-200'>
            <div className='overflow-x-auto p-3 '>
              <table className='table-auto w-full'>
                <thead className='text-xs font-semibold uppercase text-gray-500'>
                  <tr>
                    {tableHeaders.map((item, i) => (
                      <th key={i} className='p-2'>
                        <div className='text-sm font-semibold text-left'>
                          {item.title}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='text-sm divide-y divide-gray-100'>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      {/* {screen.width > 1000 && ( */}
                      {(
                        <td className='p-2'>
                          <div className='font-medium text-base text-left text-violet-700'>
                            {capitalize(row.type)}
                          </div>
                        </td>
                      )}
                      <td className='p-2'>
                        <Link href={`/${row.type}/${row.id}`}>
                          <p className='font-medium text-base text-left sm:underline lg:no-underline text-violet-700'>
                            {formatName(row.name)}
                          </p>
                        </Link>
                      </td>
                      <td className='p-2'>
                        <div className='font-medium text-base text-left text-violet-700'>
                          {row.location}
                        </div>
                      </td>
                      {/* {screen.width > 1000 && ( */}
                      {(
                        <td className='p-2'>
                          <div className='flex justify-center'>
                            <button
                              onClick={() =>
                                navigation.push(`/${row.type}/${row.id}`)
                              }
                              className='buttonText bg-violet-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease hover:bg-violet-700 active:bg-violet-800'
                            >
                              Open
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr
                style={{
                  height: '1px',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsTable;
