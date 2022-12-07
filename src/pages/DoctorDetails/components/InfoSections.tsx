const payment = [
  { title: "Top Payments Made" },
  { title: "Top Products" },
  { title: "Top Manufacturers" },
];

export const InfoSections = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="my-2 mx-1 grid grid-cols-3 rounded-lg border-2 border-violet-400 p-2">
        {payment.map((p, i) => (
          <div key={i} className="flex flex-col ">
            <p className="font flex justify-center font-semibold underline">
              {p.title}
            </p>
            <ul className="flex justify-center">
              <li>Hello</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="my-5">
        <hr />
      </div>
      <div className="my-2 mx-1 rounded-lg border-2 border-violet-400 p-2">
        <div className="flex flex-col ">
          <p className="flex justify-center text-base font-semibold">
            All Transaction Summaries
          </p>
        </div>
      </div>
    </div>
  );
};
