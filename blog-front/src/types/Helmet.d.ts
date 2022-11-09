// @types/react-helmetでエラーが出るので回避

declare module "react-helmet" {
  declare class Helmet extends React.Component<{ children: React.ReactNode }> {}
}
