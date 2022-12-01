(defn readFile [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (doall (line-seq rdr))))

(defn parseLongWithDefaultZero [str]
  (let [long (parse-long str)]
    (if (= long nil) 0 long)))


(defn sumOfStringChunk [chunk]
  (reduce + (map parseLongWithDefaultZero chunk)))


(def part1
  (reduce max
    (map sumOfStringChunk
      (partition-by #(= "" %) (readFile "inputs/01")))))

(def part2
  (reduce +
    (take 3
      (sort >
        (map sumOfStringChunk
          (partition-by #(= "" %) (readFile "inputs/01")))))))


(println part2)
