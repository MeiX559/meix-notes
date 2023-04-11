# dumi+father 搭建 react 组件库

## 为什么选择 dumi+father

## 目录结构

### .umirc.ts 文件

`.umirc.ts`是 umi 项目的配置文件，dumi 是 umi 在组件库开发中的一个最佳实践，但是它本质还是一个 umi 插件，因此只要是 umi 的配置，都是可以在 dumi 中正常使用的。

### .fatherrc.ts 文件

`.fatherrc.ts`是 `father-build`的配置文件，组件库如何编译，编译后产生的类型都是在这里配置。

### /docs/index.md

:::details

```text
---
hero:
  title: meix_components
  desc: meix_components site example
  actions:
    - text: Getting Started
      link: /components
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: Feature 1
    desc: Balabala
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: Feature 2
    desc: Balabala
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Feature 3
    desc: Balabala
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

## Hello ui_components
```

:::

配置完成后，就可以直接写组件了

### 组件

在 src 目录下新建需要编写组件的文件，如我需要自己写一个 button 组件，那么就新建 `MyButton` 文件夹，再其目录下新建 `index.tsx` 文件用于写 MyButton 组件的实现，`index.md` 文件用于写 demo 及使用说明，如下所示：

:::details index.md

````md
---

nav:
title: Components
path: /components

group
title: MyButton

---

## MyButton

Demo:

```tsx
import React from 'react'
import { MyButton } from 'ui_components'
export default () => (
  <>
    <MyButton type="primary">primary</MyButton>
    <MyButton type="success">success</MyButton>
    <MyButton type="warning" size="large">
      warning
    </MyButton>
    <MyButton type="danger" disabled={true}>
      danger
    </MyButton>
  </>
)
```
````

:::

:::details index.tsx

```js
import React from 'react';
import $classnames from 'classnames';
import './index.less';

const ButtonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'] as const;
export type ButtonType = typeof ButtonTypes[number];

const ButtonShapes = ['default', 'circle', 'round'] as const;
export type ButtonShape = typeof ButtonShapes[number];

const ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

// 基础属性
interface BaseButtonProps {
  className?: string;
  type?: ButtonType;
  shape?: ButtonShape;
  size?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => {};
}
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>;

// 原生button的属性
export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

// 将AnchorButtonProps & NativeButtonProps的类型属性都变为可选的
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const MyButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    type = 'default',
    className,
    disabled = false,
    size,
    shape = 'default',
    children,
    htmlType = 'button',
    ...rest
  } = props;

  const mergedDisabled = disabled;

  const buttonRef = (ref as any) || React.createRef<HTMLAnchorElement | HTMLButtonElement>();

  const classes = $classnames('my-btn', className, {
    [`my-btn-${type}`]: type,
    [`my-btn-${size}`]: size,
    [`my-btn-${shape}`]: shape !== 'default' && shape,
    disabled: disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    // disabled 为true
    if (mergedDisabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  return (
    <button
      {...(rest as NativeButtonProps)}
      className={classes}
      type={htmlType}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default MyButton;

```

:::
