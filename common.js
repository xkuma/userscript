var Strings = {
    subStrLeft: function (str, chars) {
        let pos = str.indexOf(chars);
        if (pos > -1)
            return str.substring(0, pos);
        return str;
    },
    subStrRight: function (str, chars) {
        let pos = str.indexOf(chars);
        let len = chars.length;
        if (pos > -1)
            return str.substring(pos + len);
        return str;
    },
    subStrCenter: function (str, start, end) {
        return Strings.subStrLeft(Strings.subStrRight(str, start), end);
    },
    subLastStrLeft: function (str, chars) {
        let pos = chars.lastIndexOf(chars);
        if (pos > -1)
            return str.substring(0, pos);
        return str;
    },
    subLastStrRight: function (str, chars) {
        let pos = str.lastIndexOf(chars);
        let len = chars.length;
        if (pos > -1)
            return str.substring(pos + len);
        return str;
    },
    subLastStrCenter: function (str, start, end) {
        return Strings.subStrRight(Strings.subStrLeft(str, end), start);
    }
}
