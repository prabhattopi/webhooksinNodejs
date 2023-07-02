
import './App.css';
import { useState } from 'react';
import axios from 'axios';

type Event = {
  key: string;
  title: string;
  checked: boolean;
};

const eventsList: Event[] = [
  {
    key: 'COMMIT',
    title: 'Commit',
    checked: true,
  },
  {
    key: 'PUSH',
    title: 'Push',
    checked: false,
  },
  {
    key: 'MERGE',
    title: 'Merge',
    checked: false,
  },
];

type FormData = {
  payloadUrl: string;
  secret: string;
  eventTypes: Event[];
};

const axiosInstance = axios.create({
    baseURL: "https://port-4000-nodejs-blue-vulture-topi9864290159.codeanyapp.com"
  });
function App() {
  const [formData, setFormData] = useState<FormData>({
    payloadUrl: '',
    secret: '',
    eventTypes: [...eventsList],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance.post(`/api/webhooks`, {
      ...formData,
      eventTypes: formData.eventTypes
        .filter((item) => item.checked)
        .map((item) => item.key),
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key?: string
  ) => {
    if (e.target.name === 'eventTypes') {
  

        const checkboxes = formData.eventTypes.map((item) =>item.key===key?{...item,checked:!item.checked}:item);
        setFormData({...formData, eventTypes:checkboxes})
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleEventHappened = (key: string) => {
    axiosInstance.post(`/api/event-emulate`, {
      type: key,
      data: { eventType: key, initiator: 'Prabhat Singh' },
    });
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center py-4">
        My Github (My Repo)
      </h1>
      <div className="container mx-auto">
        <h1 className="text-xl">Register a webhook</h1>
        <form className="mt-16" onSubmit={handleSubmit}>
          <div>
            <label className="block" htmlFor="payloadUrl">
              Webhook url
            </label>
            <input
              onChange={handleFormChange}
              value={formData.payloadUrl}
              name="payloadUrl"
              type="text"
              id="payloadUrl"
              className="w-full"
            />
          </div>
          <div className="mt-4">
            <label className="secret" htmlFor="url">
              Secret
            </label>
            <input
              onChange={handleFormChange}
              value={formData.secret}
              name="secret"
              type="text"
              id="secret"
              className="w-full"
            />
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Trigger webhook on events</h3>
            {formData.eventTypes.map((item) => {
              return (
                <div key={item.key}>
                  <input
                    onChange={(e) => handleFormChange(e, item.key)}
                    checked={item.checked}
                    name="eventTypes"
                    id={item.key}
                    type="checkbox"
                  />
                  <label className="ml-2" htmlFor={item.key}>
                    {item.title}
                  </label>
                </div>
              );
            })}
          </div>
          <button
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-xl"
            type="submit"
          >
            Register webhook
          </button>
        </form>

        <div className="mt-12">
          <h1>Emulate events</h1>
          <div className="flex items-center gap-4">
            {eventsList.map((eventType) => (
              <button
                key={eventType.key}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl"
                onClick={() => handleEventHappened(eventType.key)}
              >
                {eventType.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
