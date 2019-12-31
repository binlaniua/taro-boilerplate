import { View, Block } from "@tarojs/components";
import cn from "./index.module.less";
import { useState, useEffect, useCallback } from "@tarojs/taro";
import { isObj } from "../util";

interface ITransitionProps {
  customStyle?: string;
  customClass?: string;
  show: boolean;
  duration: any;
  name: string;
  children?: any;
  onBeforeEnter?: () => void;
  onEnter?: () => void;
  onAfterEnter?: () => void;
  onBeforeLeave?: () => void;
  onLeave?: () => void;
  onAfterLeave?: () => void;
}

export default function Transition(props: ITransitionProps) {
  const externalClasses = [
    "enter-class",
    "enter-active-class",
    "enter-to-class",
    "leave-class",
    "leave-active-class",
    "leave-to-class",
    "custom-class"
  ];
  let [state, setState] = useState({
    type: "",
    inited: false,
    display: false,
    status: "",
    classes: "",
    currentDuration: ""
  });

  const getClassNames = name => ({
    enter: `${cn[`van_${name}_enter`]} ${
      cn[`van_${name}_enter_active`]
    } enter_class enter_active_class`,
    enter_to: `${cn[`van_${name}_enter_to`]} ${
      cn[`van_${name}_enter_active`]
    } enter_to_class enter_active_class`,
    leave: `${cn[`van_${name}_leave`]} ${
      cn[`van_${name}_leave_active`]
    } leave_class leave_active_class`,
    leave_to: `${cn[`van_${name}_leave_to`]} ${
      cn[`van_${name}_leave_active`]
    } leave_to_class leave_active_class`
  });

  const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

  const enter = () => {
    console.log("enter...", cn);
    const { duration, name } = props;
    const classNames = getClassNames(name);
    console.log("enter name...", name);
    console.log("classNames...", classNames);
    const currentDuration = isObj(duration) ? duration.enter : duration;
    setState(preState => ({
      ...preState,
      status: "enter"
    }));
    console.log("currentDuration...", currentDuration);
    console.log("enter 1...", state);

    props.onBeforeEnter && props.onBeforeEnter();
    Promise.resolve()
      .then(nextTick)
      .then(() => {
        // checkStatus("enter");
        props.onEnter && props.onEnter();
        console.log("enter 2...", {
          inited: true,
          display: true,
          classes: classNames.enter,
          currentDuration
        });
        setState(preState => ({
          ...preState,
          inited: true,
          display: true,
          classes: classNames.enter,
          currentDuration
        }));
      })
      .then(nextTick)
      .then(() => {
        // checkStatus("enter");
        this.transitionEnded = false;
        setTimeout(() => onTransitionEnd(props.onAfterEnter), currentDuration);
        setState(preState => ({
          ...preState,
          classes: classNames["enter-to"]
        }));
      })
      .catch(() => {});
  };

  const leave = () => {
    if (!state.display) {
      return;
    }
    const { duration, name } = props;
    console.log("leave name...", name);
    const classNames = getClassNames(name);
    console.log("leave classNames...", classNames);
    const currentDuration = isObj(duration) ? duration.leave : duration;

    console.log("leave currentDuration...", currentDuration);
    setState(preState => ({ ...preState, status: "leave" }));

    props.onBeforeLeave && props.onBeforeLeave();
    Promise.resolve()
      .then(nextTick)
      .then(() => {
        // checkStatus("leave");
        props.onLeave && props.onLeave();
        setState(preState => ({
          ...preState,
          classes: classNames.leave,
          currentDuration
        }));
      })
      .then(nextTick)
      .then(() => {
        // checkStatus("leave");
        this.transitionEnded = false;
        setTimeout(() => onTransitionEnd(props.onAfterLeave), currentDuration);
        setState(preState => ({
          ...preState,
          classes: classNames["leave_to"]
        }));
      })
      .catch(() => {});
  };

  const checkStatus = statusParam => {
    console.log("checkStatus...", statusParam);
    console.log("checkStatus...", state.status);
    if (statusParam !== state.status) {
      throw new Error(`incongruent status: ${statusParam}`);
    }
  };

  const onTransitionEnd = callback => {
    console.log("onTransitionEnd...");
    if (this.transitionEnded) {
      return;
    }

    this.transitionEnded = true;

    callback && callback();
    const { display } = state;
    if (!props.show && display) {
      setState(preState => ({ ...preState, display: false }));
    }
  };

  useEffect(() => {
    console.log("useEffect...", props);
    props.show ? enter() : leave();
  }, [props.show]);

  // console.log("transitionState...", state);
  return (
    <Block>
      {state.inited ? (
        <View
          className={`${cn.van_transition} ${externalClasses} ${state.classes}`}
          style={`-webkit-transition-duration: ${
            state.currentDuration
          }ms; transition-duration: ${state.currentDuration}ms; ${
            state.display ? "" : "display: none;"
          } ${props.customStyle}}`}
          onTransitionEnd={onTransitionEnd}
        >
          {props.children}
        </View>
      ) : null}
    </Block>
  );
}

Transition.defaultProps = {
  show: true,
  name: "fade",
  duration: 300,
  customStyle: ""
};

Transition.externalClasses = [
  "enter-class",
  "enter-active-class",
  "enter-to-class",
  "leave-class",
  "leave-active-class",
  "leave-to-class",
  "custom-class"
];