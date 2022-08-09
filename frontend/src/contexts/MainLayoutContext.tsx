import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const context = createContext<ContextType>({
  title: "Home",
  setTitle: () => console.error("hook is not set"),
});

export default context;

export function Provider(children: PropsWithChildren<ReactNode>) {
  const [title, setTitle] = useState("Home");
  return (
    <context.Provider value={{ title, setTitle }}>{children}</context.Provider>
  );
}

export function setTitle(title: React.SetStateAction<string>) {
  const con = useContext(context);
  useEffect(() => {
    con.setTitle(title);
  }, []);
}

export function getTitle() {
  return useContext(context).title;
}
