import { EditorState, convertFromRaw, ContentState } from "draft-js";

const buildTextInitialValue = (item, pathLabel, initialValues) => {
  if (item.occurrences.upperOccurrences === 1) {
    if (item.value === null) {
      initialValues[pathLabel] = EditorState.createEmpty();
    } else {
      try {
        JSON.parse(item.value);
        initialValues[pathLabel] = EditorState.createWithContent(convertFromRaw(JSON.parse(item.value)));
      } catch (e) {
        initialValues[pathLabel] = EditorState.createWithContent(ContentState.createFromText(item.value.toString()));
      }
    }
  } else {
    if (item.value === null) {
      initialValues[pathLabel] = [{
        textId: 0,
        value: EditorState.createEmpty()
      }];
    } else {
      let array = [];
      array = item.value.map(obj => {
        try {
          JSON.parse(obj.value);
          return {
            textId: obj.textId,
            value: EditorState.createWithContent(convertFromRaw(JSON.parse(obj.value)))
          };
        } catch {
          return {
            textId: obj.textId,
            value: EditorState.createWithContent(ContentState.createFromText(obj.value.toString()))
          };
        }
      });
      initialValues[pathLabel] = array;
    }
  }
};

export { buildTextInitialValue };