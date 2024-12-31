import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>Dropdown Render (Footer)</div>
        <CodeBlock>
          {`
dropdownRender={(menu) => {
                  return (
                    <>
                      {menu}
                      <Divider className="mb-1 mt-0" />
                      <div className="mx-1 mb-1">
                        <ButtonAdd
                          className="w-full font-normal"
                          variant="ghost"
                          primary={false}
                          srOnly={false}
                          onClick={() => {
                            setPeriodAddModalOpen(true);
                          }}
                        >
                          Add period
                        </ButtonAdd>
                      </div>
                    </>
                  );
                }}
      `}
        </CodeBlock>
      </div>
    </div>
  );
}
