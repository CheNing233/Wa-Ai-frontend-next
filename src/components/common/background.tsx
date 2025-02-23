

export default function Background() {

  return (
    <div
      className={"absolute top-0 left-0 w-dvw h-dvh -z-10"}
    >
      <svg
        id="wa-background"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100dvw", height: "100dvh", display: "block", zIndex: -10 }}
        version="1.1" viewBox="0 0 900 600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {/*<rect fill="#001220" height="600" width="900" x="0" y="0" />*/}
        {/*<g fill="none" stroke="#0066FF" strokeWidth="2">*/}
        {/*  <circle cx="735" cy="251" r="145" />*/}
        {/*  <circle cx="300" cy="484" r="63" />*/}
        {/*  <circle cx="24" cy="287" r="85" />*/}
        {/*  <circle cx="346" cy="172" r="123" />*/}
        {/*</g>*/}
        <g>
          <g transform="translate(762 47)">
            <path
              d="M158.7 -60.7C179.8 13.3 153.2 93.8 95.3 137.2C37.5 180.6 -51.5 187 -112.4 145C-173.3 103.1 -206.1 12.7 -182.6 -64.5C-159.2 -141.8 -79.6 -205.9 -5.4 -204.2C68.8 -202.4 137.6 -134.7 158.7 -60.7Z"
              fill="none" stroke="#9353D3" strokeWidth="25" />
          </g>
          <g transform="translate(36 409)">
            <path
              d="M158.3 -52.6C177.6 7.8 146.5 83.3 89.2 125.6C31.9 167.8 -51.5 176.8 -101.2 140.5C-150.8 104.1 -166.6 22.4 -144.1 -42.5C-121.6 -107.4 -60.8 -155.5 4.4 -156.9C69.5 -158.3 139.1 -113 158.3 -52.6Z"
              fill="none" stroke="#9353D3" strokeWidth="25" />
          </g>
          <g transform="translate(562 596)">
            <path
              d="M97.3 -28.8C110.9 10.3 96.3 61.4 63.5 84.6C30.6 107.7 -20.4 103.1 -56.8 76.9C-93.2 50.8 -115 3.2 -103.1 -33.6C-91.2 -70.4 -45.6 -96.4 -1.9 -95.8C41.8 -95.2 83.7 -68 97.3 -28.8Z"
              fill="none" stroke="#9353D3" strokeWidth="25" />
          </g>
        </g>
      </svg>
      <div
        className="absolute top-0 left-0 w-dvw h-dvh"
        style={{
          zIndex: 10,
          backdropFilter: "blur(150px)",
          WebkitBackdropFilter: "blur(150px)",
          backgroundColor: "rgba(0, 0, 0, 0)"
        }}
      />
    </div>
  );
}
