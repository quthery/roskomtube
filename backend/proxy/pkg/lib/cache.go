package lib 

import (
	"sync"
	"time"
)

type cacheEntry struct {
	data      string
	expiresAt time.Time
}

type M3U8Cache struct {
	mu    sync.RWMutex
	store map[string]cacheEntry
	ttl   time.Duration
}

func NewM3U8Cache(ttl time.Duration) *M3U8Cache {
	return &M3U8Cache{
		store: make(map[string]cacheEntry),
		ttl:   ttl,
	}
}

func (c *M3U8Cache) Get(key string) (string, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	entry, ok := c.store[key]
	if !ok || time.Now().After(entry.expiresAt) {
		return "", false
	}
	return entry.data, true
}

func (c *M3U8Cache) Set(key, data string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.store[key] = cacheEntry{
		data:      data,
		expiresAt: time.Now().Add(c.ttl),
	}
}
