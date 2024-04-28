"use client";

import React, { useEffect, useState } from "react";
import { message, Popover, Spin } from "antd";
import axios from "axios";

import { useDebounce } from "@acme/hooks";
import { InputSearch } from "@acme/ui/antd/input";
import { Select } from "@acme/ui/antd/select";
import { RadioOption } from "@acme/ui/radio";

import { Link } from "~/routes/Link";
import { api } from "~/trpc/react";

export const Search = () => {
  api.words.byCambridge.useQuery({ word: "active" });
  const [options, setOptions] = useState<RadioOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input);
  useEffect(() => {
    if (debouncedInput) {
      setLoading(true);
      axios
        .get<{ word: string }[]>(
          // "https://dictionary.cambridge.org/vi/dictionary/english/active",
          `https://dictionary.cambridge.org/vi/autocomplete/amp?dataset=english&q=${input}&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org`,
        )
        .then((res) => {
          setOptions(res.data.map((x) => ({ label: x.word, value: x.word })));
        })
        .catch((error: Error) => {
          void message.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedInput]);

  return (
    <>
      <Popover
        trigger="click"
        arrow={false}
        content={
          <div className="flex min-w-[500px] flex-col gap-2">
            {!loading ? (
              options.map((o) => (
                <Link
                  to="/english/dictionary/$word"
                  params={{ word: o.value.replace(" ", "-") }}
                  className="w-full"
                >
                  {o.label}
                </Link>
              ))
            ) : (
              <Spin size="small" />
            )}
          </div>
        }
      >
        <InputSearch allowClear />
      </Popover>

      <Select
        className="min-w-96"
        options={options}
        showSearch
        notFoundContent={loading ? <Spin size="small" /> : null}
        onSearch={(input) => {
          setInput(input);
        }}
      />
    </>
  );
};
