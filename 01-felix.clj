(def calories (->>
  (slurp "inputs/01-felix")
  (#(clojure.string/split % #"\n\n"))
  (map (fn [x] (->> x
    (#(clojure.string/split % #"\n"))
    (map parse-long)
    (reduce +))))
  (sort >)))

(println "Part 1:" (reduce max calories))
(println "Part 2:" (->> calories (take 3) (reduce +)))
