using System.Text;
using System.Text.RegularExpressions;

// Text-level edit retains existing KV3 keys and formatting; refuses malformed input.
internal static class ModelKeyText
{
    public static string AddParticles(string original, IReadOnlyList<string> paths)
    {
        const string header = "<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:vmdlkeys4:version{9f5c1002-f19f-470c-bd42-c3c26c063d33} -->";
        if (string.IsNullOrWhiteSpace(original)) original = header + "\n{\n}\n";
        var pos = 0;
        Trivia(original, ref pos);
        if (pos >= original.Length || original[pos] != '{') throw new InvalidDataException("Expected KV3 root object.");
        var rootEnd = Closing(original, pos, '{', '}');
        var added = new StringBuilder();
        int? arrayStart = null, arrayEnd = null;
        pos++;
        while (pos < rootEnd)
        {
            Trivia(original, ref pos);
            if (pos >= rootEnd) break;
            var keyStart = pos;
            string key;
            if (original[pos] == '"')
            {
                var end = Quoted(original, pos);
                key = original[(pos + 1)..(end - 1)]; pos = end;
            }
            else
            {
                while (pos < rootEnd && (char.IsLetterOrDigit(original[pos]) || original[pos] == '_')) pos++;
                if (pos == keyStart) throw new InvalidDataException("Invalid KV3 key.");
                key = original[keyStart..pos];
            }
            Trivia(original, ref pos);
            if (pos >= rootEnd || original[pos++] != '=') throw new InvalidDataException("Expected KV3 assignment.");
            Trivia(original, ref pos);
            if (key == "particle_cfg_list")
            {
                if (arrayStart.HasValue) throw new InvalidDataException("Duplicate particle_cfg_list.");
                if (pos >= rootEnd || original[pos] != '[') throw new InvalidDataException("particle_cfg_list is not an array.");
                arrayStart = pos; arrayEnd = Closing(original, pos, '[', ']');
            }
            pos = ValueEnd(original, pos, rootEnd);
            Trivia(original, ref pos);
            if (pos < rootEnd && original[pos] == ',') pos++;
        }
        var existing = arrayStart.HasValue ? original[arrayStart.Value..(arrayEnd!.Value + 1)] : "";
        foreach (var path in paths.Distinct(StringComparer.OrdinalIgnoreCase))
        {
            if (!Regex.IsMatch(path, @"^[a-zA-Z0-9_./-]+\.vpcf$") || path.Split('/').Contains(".."))
                throw new InvalidDataException("Unsafe particle path.");
            if (Regex.IsMatch(existing, @"name\s*=\s*resource:\s*""" + Regex.Escape(path) + @"""", RegexOptions.IgnoreCase)) continue;
            added.Append("\n\t\t{ name = resource:\"").Append(path).Append("\" config = \"preview\" },");
        }
        if (added.Length == 0) return original;
        if (arrayEnd.HasValue)
        {
            // Accept an existing last object with or without a trailing comma.
            var tail = LastSignificant(original, arrayStart!.Value + 1, arrayEnd.Value);
            if (tail >= 0 && original[tail] != ',') added.Insert(0, ',');
            return original.Insert(arrayEnd.Value, added + "\n\t");
        }
        return original.Insert(rootEnd, "\n\tparticle_cfg_list = [" + added + "\n\t]\n");
    }

    private static int LastSignificant(string s, int start, int end)
    {
        var last = -1; var p = start;
        while (p < end) { Trivia(s, ref p); if(p >= end)break; if(s[p]=='"'){last=p;p=Quoted(s,p);}else{last=p++;} }
        return last;
    }
    private static int ValueEnd(string s, int p, int limit)
    {
        if(p>=limit) throw new InvalidDataException("Missing KV3 value.");
        if(s[p]=='[')return Closing(s,p,'[',']')+1;
        if(s[p]=='{')return Closing(s,p,'{','}')+1;
        if(s[p]=='"')return Quoted(s,p);
        while(p<limit && !char.IsWhiteSpace(s[p]) && s[p]!=',')
        {
            if(s[p]=='"')return Quoted(s,p);
            p++;
        }
        return p;
    }
    private static int Closing(string s, int p, char open, char close)
    {
        var depth=0;
        while(p<s.Length)
        {
            Trivia(s,ref p); if(p>=s.Length)break;
            if(s[p]=='"'){p=Quoted(s,p);continue;}
            if(s[p]==open)depth++;
            if(s[p]==close)depth--;
            if(s[p]==close && depth==0)return p;
            p++;
        }
        throw new InvalidDataException("Unclosed KV3 object/array.");
    }
    private static int Quoted(string s,int p)
    {
        p++;
        while(p<s.Length){if(s[p]=='\\'){p+=2;continue;}if(s[p++]=='"')return p;}
        throw new InvalidDataException("Unclosed KV3 string.");
    }
    private static void Trivia(string s,ref int p)
    {
        while(p<s.Length)
        {
            if(char.IsWhiteSpace(s[p])){p++;continue;}
            string? end = s.AsSpan(p).StartsWith("<!--") ? "-->" : s.AsSpan(p).StartsWith("/*") ? "*/" : null;
            if(end!=null){var n=s.IndexOf(end,p+2,StringComparison.Ordinal);if(n<0)throw new InvalidDataException("Unclosed comment.");p=n+end.Length;continue;}
            if(s.AsSpan(p).StartsWith("//")){var n=s.IndexOf('\n',p+2);p=n<0?s.Length:n+1;continue;}
            break;
        }
    }
}
