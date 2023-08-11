import Filter from 'bad-words';

export async function processUserText(text) {
    const filter = new Filter();

    const cleanText = filter.clean(text);
    if (cleanText !== text)
    {
        return "Bad word";
    }
    else
    {
        return "Text";
    }
}
