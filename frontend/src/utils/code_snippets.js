const codeSnippets = {
    bashCode: url => {
        return `#!/usr/bin/env bash\n\ncurl "${url}" \\\n\t-H "Accept: application/json" | jq`
    },
    pythonCode: url => {
        return `import requests\nimport json\n\nurl = "${url}"\nheaders = {"Accept": "application/json"}\n\nresponse = requests.get(url, headers=headers)\n\nif response.status_code == 200:\n    data = response.json()\n    formatted_data = json.dumps(data, indent=4)\n    print(formatted_data)\nelse:\n    print("Failed to fetch data:", response.status_code)`
    },
    javascriptCode: (hostname, pathname) => {
        return `const https = require("https");\nconst util = require("util");\n\nconst options = {\n  hostname: "${hostname}",\n  path: "${pathname}",\n  method: "GET",\n  headers: {\n    Accept: "application/json",\n  },\n};\n\nconst req = https.request(options, (res) => {\n  let data = "";\n\n  res.on("data", (chunk) => {\n    data += chunk;\n  });\n\n  res.on("end"), () => {\n    try {\n      const jsonData = JSON.parse(data);\n      console.log(util.insepct(jsonData, { colors: true, depth: null}));\n    } catch (error) {\n      console.error("Error parsing JSON:", error.message);\n    }\n  });\n});\n\nreq.on("error", (error) => {\n  console.error("Error fetching data:", error.message);\n});\n\nreq.end();`
    },
}

export { codeSnippets }
