import { View, Button } from "@tarojs/components";
import { useState, ComponentOptions } from "@tarojs/taro";

import configData from "./config";
import QMIcon from "ui-base/icon";

import cn from "./index.module.less";
export default function IconPage() {
  const [state, setState] = useState({
    active: 0
  });

  const switchActive = index => {
    setState({
      active: index
    });
  };

  const currentType = ["basic", "outline", "filled", "case"];
  console.log(
    "configData[currentType[state.active]]...",
    configData[currentType[state.active]]
  );
  return (
    <View className="vbox">
      <View className="hbox">
        <Button
          size="mini"
          style={state.active == 0 ? "background-color: #3d85cc" : ""}
          onClick={() => {
            switchActive(0);
          }}
        >
          基础图标
        </Button>
        <Button
          size="mini"
          style={state.active == 1 ? "background-color: #3d85cc" : ""}
          onClick={() => {
            switchActive(1);
          }}
        >
          线框风格
        </Button>
        <Button
          size="mini"
          style={state.active == 2 ? "background-color: #3d85cc" : ""}
          onClick={() => {
            switchActive(2);
          }}
        >
          实地风格
        </Button>
        <Button
          size="mini"
          style={state.active == 3 ? "background-color: #3d85cc" : ""}
          onClick={() => {
            switchActive(3);
          }}
        >
          用法示例
        </Button>
      </View>
      <View className="wrap_box">
        {configData[currentType[state.active]].map((v, i) => (
          <QMIcon name={v} key={v + i} size="32px" custom-class={cn.icon} />
        ))}
      </View>
    </View>
  );
}

IconPage.options = {
  addGlobalClass: true
} as ComponentOptions;