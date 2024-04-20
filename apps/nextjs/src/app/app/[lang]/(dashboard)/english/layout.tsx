import { WordTable } from "./components/WordTable";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WordTable />
      {children}
    </>
  );
}
