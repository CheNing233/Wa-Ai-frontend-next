import React from "react";
import loadable from "@loadable/component";
import { Spinner } from "@heroui/spinner";


// https://github.com/gregberge/loadable-components/pull/226
function load(fn: any, options: any) {
  const Component = loadable<any>(fn, options);

  Component.preload = fn.requireAsync || fn;

  return Component;
}

function LoadingComponent(props: {
  error: boolean;
  timedOut: boolean;
  pastDelay: boolean;
}) {
  if (props.error) {
    console.error(props.error);

    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 60px)"
      }}
    >
      <Spinner />
    </div>
  );
}

const lazyLoad = (loader: any) => load(loader, {
  fallback: LoadingComponent({
    pastDelay: true,
    error: false,
    timedOut: false
  })
});

export default lazyLoad;

