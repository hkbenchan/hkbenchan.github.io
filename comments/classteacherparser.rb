require 'csv'
require 'json'

excludeWord = [
  "and",
  "is",
  "to",
  "xxx",
  "a",
  "he/she",
  "in",
  "his/her",
  "the",
  "has",
  "class",
  "more",
  "with",
  "student",
  "needs",
  "of",
  "who",
  "be",
  "but",
  "academic",
  "for",
  "work",
  "an",
  "activities",
  "classmates",
  "results",
  "effort",
  "school",
  "by",
  "gets",
  "on",
  "teachers",
  "along",
  "always",
  "as",
  "himself/herself",
  "term",
  "are",
  "peers",
  "others",
  "develop",
  "participate",
  "studies",
  "should",
  "help",
  "time",
  "made",
  "skills",
  "could",
  "would",
  "it",
  "at",
  "goals",
  "not",
  "participates",
  "higher",
  "discussions",
  "toward",
  "needed",
  "subject",
  "them",
  "homework",
  "set",
  "if",
  "very",
  "times",
  "does",
  "areas",
  "second",
  "him/her",
  "make",
  "able",
  "can",
  "often",
  "been",
  "all",
  "when",
  "do",
  "hands",
  "this",
  "that",
  "see",
  "kind",
  "into",
  "though",
  "although",
  "some",
  "too",
  "sometimes",
  "lot",
  "students",
  "follows"
]

wordings = {

}

sentences = {}

filename = 'classteacher.csv'
finalAssetBasePath = './'
CSV.foreach(filename, quote_char: '"', col_sep: ',', row_sep: :auto, headers: true) do |row|

  unless row["Comment"].nil?
    wordSet = row["Comment"].split(" ")
    wordSet.each do |value|
      tmpValue = value.downcase.gsub(/[,\.\!]/, '')
      unless excludeWord.include?(tmpValue)
        wordings[tmpValue] = wordings[tmpValue] || {
          :s => [],
          :count => 0
        }
        wordings[tmpValue][:count] += 1
        wordings[tmpValue][:s] << row["No"]
      end
    end
    sentences[row["No"]] = row["Comment"]
  end

end

def sortByValue(wordingSet)
  return wordingSet.sort_by { |k, v| v }
end

def toRealJson(wordingSet)

  set = {}

  # wordingSet.each do |key, value|
  #   keys = key.split('.')
  #   set[keys[0]] = set[keys[0]] || {}
  #   unless keys.length <= 2
  #     set[keys[0]][keys[1]] = set[keys[0]][keys[1]] || {}
  #   end
  #
  #   obj = set
  #   for i in 0..(keys.length - 2) do
  #     obj[keys[i]] = obj[keys[i]] || {}
  #     obj = obj[keys[i]]
  #   end
  #
  #   obj[keys[keys.length - 1]] = value
  # end

  return wordingSet
end

File.open(finalAssetBasePath + 'classteacher.json', 'w') do |f|
  f.write(JSON.pretty_generate({
    :count => wordings,
    :s => sentences
  }))
end

# puts JSON.pretty_generate(sortByValue(wordings))

puts 'Convert completed'
