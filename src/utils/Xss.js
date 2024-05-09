import xss from "xss";

let options = {
  whiteList: {
    a: ["class", "id", "target", "title"],
    div: ["class"],
    p: ["class"],
    li: ["class", "id"],
    span: ["class", "title", "aria-hidden"],
    input: ["type", "src", "disabled", "checked", "class"],
    img: ["alt", "title", "width", "max-width", "height"],
    annotation: ["encoding"],
    body: [],
    link: [],
  },
  stripIgnoreTagBody: ["script"],
  onTagAttr: function (tag, name, value, isWhiteAttr) {
    if (!isWhiteAttr && (name === "onclick" || name === "script")) {
      return "";
    }

    if (
      tag == "img" &&
      name == "src" &&
      /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/.test(value)
    ) {
      return "";
    }

    if (tag == "link" && name == "href" && value.includes("javascript")) {
      return "";
    }
  },
};

export default new xss.FilterXSS(options);
