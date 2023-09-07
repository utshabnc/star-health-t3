import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiHappyBeaming, BiSad } from "react-icons/bi";
import { SlEmotsmile } from "react-icons/sl";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";

const MentalHealthDiary: React.FC = () => {
  const { data: session, status } = useSession();

  const userId = session?.user?.id || "cllxyib7m0000lf08kqeao8nj";

  const [entryDate, setEntryDate] = useState<any>(
    new Date().toISOString().split("T")[0]
  );
  const [diaryId, setDiaryId] = useState();
  const [moodScale, setMoodScale] = useState(0);
  const [emotionTags, setEmotionTags] = useState("");
  const [journal, setJournal] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [trigger, setTrigger] = useState("");
  const [copingMechUsed, setCopingMechUsed] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [moodGraphData, setMoodGraphData] = useState([
    { id: 2, day: "Monday", mood: 0 },
    { id: 3, day: "Tuesday", mood: 0 },
    { id: 4, day: "Wednesday", mood: 0 },
    { id: 5, day: "Thursday", mood: 0 },
    { id: 6, day: "Friday", mood: 0 },
    { id: 7, day: "Saturday", mood: 0 },
    { id: 1, day: "Sunday", mood: 0 },
  ]);
  const [chartData, setCharData] = useState({
    labels: moodGraphData.map((data) => data.day),
    datasets: [
      {
        label: "Mood Over the Week",
        data: moodGraphData.map((data) => data.mood),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const emotionsArr = [
    "Happy",
    "Sad",
    "Anxious",
    "Tired",
    "Angry",
    "Depressed",
    "Bored",
    "Excited",
  ];
  useEffect(() => {
    fetch(
      `/api/mentalHealthDiary/getDiarybyDate/?userId=${userId}&date=${entryDate}`
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (!data["diary"][0]) {
          setDiaryId(undefined);
          setGratitude("");
          setEmotionTags(emotionsArr[0] ?? "");
          setCopingMechUsed("");
          setMoodScale(0);
          setTrigger("");
          setJournal("");
        } else {
          const c = data["diary"][0];

          setDiaryId(c["id"]);
          setGratitude(c["dailyGratitude"]);
          setEmotionTags(emotionTags);
          setCopingMechUsed(c["copingStrategies"]);
          setMoodScale(c["moodScale"]);
          setTrigger(c["triggerIdentification"]);
          setJournal(c["freeFormJournal"]);
        }
        setMoodGraphData(data["moodByDayOfWeek"]);
        setCharData({
          labels: data["moodByDayOfWeek"].map((data: any) => data.day),
          datasets: [
            {
              label: "Mood Over the Week",
              data: data["moodByDayOfWeek"].map((data: any) => data.mood),
              backgroundColor: ["rgba(75,192,192,1)"],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      });
    });
  }, [entryDate]);
  const saveDiary = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);
    const body = {
      id: diaryId,
      userId: userId,
      entryDate: entryDate,
      moodScale: moodScale,
      emotionTags: emotionTags,
      freeFormJournal: journal,
      dailyGratitude: gratitude,
      triggerIdentification: trigger,
      copingStrategies: copingMechUsed,
    };
    try {
      await fetch("/api/mentalHealthDiary/saveDiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((message: any) => {
        toast(`Successfully added custom Substance.`, {});
        setIsSaving(false);

        // setaddCustomSubstanceStatus(0)
      });
    } catch (error) {
      toast(`Error has occured. Try Again`, {});
      setIsSaving(false);

      console.error("An error occurred while submitting the form", error);
    }
    return;
  };
  return (
    <div>
      <section>
        <div className="mb-2">
          <div className="mb-1 font-semibold">
            Pick date to retrieve your Mental Health Diary for that day
          </div>
          <input
            value={entryDate}
            onChange={(e) => {
              setEntryDate(e.target.value);
            }}
            className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
            type="date"
          ></input>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="chart-container w-[50%]">
          <h2 style={{ textAlign: "center" }}>Weekly Summary</h2>
          <Line
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Mood Over the Week",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </section>
      <section>
        <div>
          <div>
            <div className="mb-1 font-semibold">
              Select your mood on a wcale from 1 to 10:
              <div className="font-bold text-purple-700">{moodScale}</div>
            </div>
            <div className="flex">
              <BiSad size={40} color="#7e22ce"></BiSad>

              <input
                type="range"
                onChange={(e) => {
                  setMoodScale(parseInt(e.target.value));
                }}
                min={1}
                max={10}
                step={1}
                value={moodScale}
                className="w-[30%] text-purple-700 accent-current"
              ></input>
              <BiHappyBeaming size={40} color="#7e22ce"></BiHappyBeaming>
            </div>
          </div>
          <div>
            <div className="mb-1 font-semibold">
              Pick the emotion that best summarizes your day:
            </div>
            <select
              className="rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              onChange={(e) => {
                setEmotionTags(e.target.value);
              }}
            >
              {emotionsArr.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Write about your day:</div>
            <textarea
              value={journal}
              cols={50}
              maxLength={500}
              className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              onChange={(e) => setJournal(e.target.value)}
            />
          </div>
          <div className="">
            <div className="mb-1 font-semibold">Daily Gratitude:</div>
            <textarea
              value={gratitude}
              cols={50}
              maxLength={500}
              className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              onChange={(e) => setGratitude(e.target.value)}
            />
          </div>
          <div className="">
            <div className="mb-1 font-semibold">
              If you felt nervous or had anxiety today, write what has caused it
              to or triggered it
            </div>
            <textarea
              value={trigger}
              cols={50}
              maxLength={500}
              className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              onChange={(e) => setTrigger(e.target.value)}
            />
          </div>
          <div className="">
            <div className="mb-1 font-semibold">
              Write about the coping mechanisisms that you used that assisted
              you in getting over your anxiety if you have faced it today:
            </div>
            <textarea
              value={copingMechUsed}
              cols={50}
              maxLength={500}
              className="w-full rounded-lg border border-violet-900 bg-violet-100 p-1 text-slate-900 placeholder:text-violet-800 hover:bg-violet-300 hover:text-violet-900"
              onChange={(e) => setCopingMechUsed(e.target.value)}
            />
          </div>
        </div>
      </section>
      <button
        onClick={(e) => {
          if (!isSaving) {
            saveDiary(e);
          }
        }}
        className="ease focus:shadow-outline w-[100%] select-none rounded-md border border-violet-700 bg-violet-700 px-4 py-2 text-white transition duration-500 hover:bg-violet-900 focus:outline-none"
      >
        Save Diary
        {isSaving && (
          <>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </>
        )}
      </button>
    </div>
  );
};
export default MentalHealthDiary;
