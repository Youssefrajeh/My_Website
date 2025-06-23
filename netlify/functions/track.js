// Netlify serverless function for visitor tracking
exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { type, data } = JSON.parse(event.body);
        
        // Log tracking data (in production, you'd save to a database)
        console.log('Visitor tracking data received:', {
            type,
            timestamp: new Date().toISOString(),
            sessionId: data.sessionId,
            url: data.url || data.page,
            userAgent: data.userAgent,
            // Log key metrics without sensitive data
            eventName: data.eventName,
            referrer: data.referrer
        });

        // Here you would typically:
        // 1. Save to a database (Supabase, MongoDB, etc.)
        // 2. Send to analytics service
        // 3. Queue for processing
        
        // Example: Save to Supabase
        // const { createClient } = require('@supabase/supabase-js');
        // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        // await supabase.from('visitor_tracking').insert([
        //     {
        //         type,
        //         data,
        //         timestamp: new Date().toISOString(),
        //         ip_address: event.headers['x-forwarded-for'] || event.headers['x-nf-client-connection-ip']
        //     }
        // ]);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: 'Tracking data received',
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('Tracking error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
}; 