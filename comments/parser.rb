require 'csv'
require 'json'

wordings = {
  :alt => {
    :good => [],
    :normal => [],
    :bad => []
  },
  :homework => {
    :good => [],
    :normal => [],
    :bad => []
  },
  :result => {
    :good => [],
    :normal => [],
    :bad => []
  },
  :writing => {
    :good => [],
    :normal => [],
    :bad => []
  },
  :reading => {
    :good => [],
    :normal => [],
    :bad => []
  }
}

#
# altWordings = {}
# homeworkWordings = {}
# resultWordings = {}

filename = 'ch.csv'
finalAssetBasePath = './'
CSV.foreach(filename, quote_char: '"', col_sep: ',', row_sep: :auto, headers: true) do |row|

  unless row["Alt"].nil?
    if row["Alt"] == "3"
      wordings[:alt][:good] << row["Comment"]
    elsif row["Alt"] == "2"
      wordings[:alt][:normal] << row["Comment"]
    elsif row["Alt"] == "1"
      wordings[:alt][:bad] << row["Comment"]
    end
  end

  unless row["Homework"].nil?
    if row["Homework"] == "3"
      wordings[:homework][:good] << row["Comment"]
    elsif row["Homework"] == "2"
      wordings[:homework][:normal] << row["Comment"]
    elsif row["Homework"] == "1"
      wordings[:homework][:bad] << row["Comment"]
    end
  end

  unless row["Result"].nil?
    if row["Result"] == "3"
      wordings[:result][:good] << row["Comment"]
    elsif row["Result"] == "2"
      wordings[:result][:normal] << row["Comment"]
    elsif row["Result"] == "1"
      wordings[:result][:bad] << row["Comment"]
    end
  end

  unless row["Writing"].nil?
    if row["Writing"] == "3"
      wordings[:writing][:good] << row["Comment"]
    elsif row["Writing"] == "2"
      wordings[:writing][:normal] << row["Comment"]
    elsif row["Writing"] == "1"
      wordings[:writing][:bad] << row["Comment"]
    end
  end

  unless row["Reading"].nil?
    if row["Reading"] == "3"
      wordings[:reading][:good] << row["Comment"]
    elsif row["Reading"] == "2"
      wordings[:reading][:normal] << row["Comment"]
    elsif row["Reading"] == "1"
      wordings[:reading][:bad] << row["Comment"]
    end
  end
  # tcWordings[row["internal key"]] = row["SCHSA中文"] || row["zh-hk"]
  # # tcWordings[row["internal key"]] = row["zh-hk"]
  # unless row["en"].nil?
  #   enWordings[row["internal key"]] = row["en"]
  # end
  #
  # unless row["zh-cn"].nil?
  #   scWordings[row["internal key"]] = row["zh-cn"]
  # end
end

# def sortByKey(wordingSet)
#   return wordingSet.sort_by { |k, v| k }
# end

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

File.open(finalAssetBasePath + 'ch.json', 'w') do |f|
  f.write(JSON.pretty_generate(toRealJson(wordings)))
end

# File.open(finalAssetBasePath + 'zh-hk.json', "w") do |f|
#   f.write(JSON.pretty_generate(toRealJson(sortByKey(tcWordings))))
# end
#
# File.open(finalAssetBasePath + 'en.json', "w") do |f|
#   f.write(JSON.pretty_generate(toRealJson(sortByKey(enWordings))))
# end
#
# File.open(finalAssetBasePath + 'zh-cn.json', "w") do |f|
#   f.write(JSON.pretty_generate(toRealJson(sortByKey(scWordings))))
# end

puts 'Convert completed'
