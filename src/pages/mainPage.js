import React, { useLayoutEffect, useState } from "react";
import { ExternalLink } from "react-external-link";
import api from "../apiCalls/mainPageApi.js";
import {
  AppProvider,
  Page,
  Card,
  TextField,
  ColorPicker,
} from "@shopify/polaris";

function MainPage() {
  const initialValue = { input: "" };
  let placeholderValue = "Enter the quote";
  const [quote, setQuote] = useState(initialValue);
  const [imageSrc, setImageSrc] = useState("No image");
  const [placeHolder, setPlaceholder] = useState(placeholderValue);
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  const handleTextFieldChange = (e) => {
    const { name, value } = e.target;
    setQuote({ ...quote, [name]: value });
    setPlaceholder(placeholderValue);

    if (quote.input.length <= 100) {
      api.quoteChange(color, quote).then((data) => {
        //   let image = JSON.stringify(data.data.image);
        let image = data.data.image;
        setImageSrc(image);
      });
    } else {
      setPlaceholder("Enter a quote less than 100 characters");
      setQuote(initialValue);
    }
  };
  useLayoutEffect(() => {
    api.quoteChange(color, quote).then((data) => {
      let image = data.data.image;
      setImageSrc(image);
    });
  }, [color, quote]);

  return (
    <>
      <Page title="AppAttic">
        <Card sectioned>
          <TextField
            value={quote.input}
            type="text"
            name="input"
            onChange={(text) =>
              handleTextFieldChange({ target: { value: text, name: "input" } })
            }
            placeholder={placeHolder}
            autoComplete="off"
          />
          <ColorPicker onChange={setColor} color={color} allowAlpha />
          <img
            alt="No image"
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={imageSrc}
          />
          <h3>
            GitHub Backend repo:
            <ExternalLink href="https://github.com/Faiz-muhammed/AppAttic-server.git"></ExternalLink>
          </h3><br/>
          <h3>Github repo frontend:<ExternalLink href="https://github.com/Faiz-muhammed/AppAttic-Client.git"></ExternalLink></h3>
        </Card>
      </Page>
    </>
  );
}

export default MainPage;
