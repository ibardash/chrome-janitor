import styled from "styled-components";

export function ClosedTabs() {
  const urls = [
    {
      id: "https://developer.chrome.com/docs/extensions/reference/storage/",
      timestamp: 1640050336824,
    },
    {
      id: "https://developer.chrome.com/docs/extensions/mv3/options/",
      timestamp: 1640050337824,
    },
    {
      id: "https://stackoverflow.com/questions/14584781/how-do-you-link-to-the-options-page-in-a-chrome-extension",
      timestamp: 1640050337924,
    },
  ];

  // replace the above with this:
  //   chrome.storage.sync.get(['key'], function(result) {
  //     console.log('Value currently is ' + result.key);
  //   });

  return (
    <>
      {urls.map(({ id, timestamp }, index) => (
        <p>{id}</p>
      ))}
    </>
  );
}
