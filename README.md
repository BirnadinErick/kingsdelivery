
> to link cuisines and variations

__For some reasons, laravel migrations doesn't work, fix late__

```mysql
ALTER TABLE variations
ADD COLUMN cuisine_id BIGINT UNSIGNED;

UPDATE variations v
JOIN products p ON v.product_id = p.product_id
SET v.cuisine_id = p.cuisine_id;

ALTER TABLE variations
ADD CONSTRAINT fk_variations_cuisine_id
FOREIGN KEY (cuisine_id) REFERENCES cuisines(id);
```
